pragma solidity ^0.4.23;


// Libraries

library SafeMath {

  /**
  * @dev Multiplies two numbers, reverts on overflow.
  */
    function mul(uint256 _a, uint256 _b) internal pure returns (uint256) {
      // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
      // benefit is lost if 'b' is also tested.
      // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (_a == 0) {
            return 0;
        }

        uint256 c = _a * _b;

        return c;
    }

  /**
  * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
  */
    function div(uint256 _a, uint256 _b) internal pure returns (uint256) {
        require(_b > 0, "second argument is 0"); // Solidity only automatically asserts when dividing by 0
        uint256 c = _a / _b;
    // assert(_a == _b * c + _a % _b); // There is no case in which this doesn't hold

        return c;
    }

  /**
  * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
  */
    function sub(uint256 _a, uint256 _b) internal pure returns (uint256) {
        require(_b <= _a, "first argument is more than the second");
        uint256 c = _a - _b;

        return c;
    }

  /**
  * @dev Adds two numbers, reverts on overflow.
  */
    function add(uint256 _a, uint256 _b) internal pure returns (uint256) {
        uint256 c = _a + _b;

        return c;
    }
}

// contract Member {
//     address addr;
// }

// contract Manager is Member {
//     uint256 chit_value;

//     constructor(uint256 _chit_value, address _addr) public {
//       super(_addr);
//       chit_value = _chit_value;
//     }
// }

contract Uni {

    address deployer;


    mapping(string => address) chit_registry;
    string[] chits;

    constructor() public {
        deployer = msg.sender;
    }

    function create_chit(string chit_name, uint chit_value, uint fee_per_cent, uint member_count) public returns (address) {
        require(chit_registry[chit_name] == address(0),"The chit should be unique");

        chit_registry[chit_name] = new Chit(chit_name, msg.sender, chit_value, fee_per_cent, member_count);

        return chit_registry[chit_name];
    }

    // if this function returns true then the chit name is available for use
    function check_chit_name(string chit_name) public view  returns (bool) {
        return chit_registry[chit_name] == address(0);
    }
}

contract Chit {

    using SafeMath for uint256;

    address uni;
    uint256 chit_value;
    uint256 chit_per_member;
    string public chit_description;
    string public chit_name;


    struct Manager {
        address addr;
        uint fee;
    }

    struct Member {
        address addr;
        // this is the mapping of timestamp => gwei recieved by the members;
        uint funds_received;

        mapping(uint => uint256) funds_sent;

        // date joined the pool
        uint date_joined;
    }

    Manager internal fund_manager;
    address internal deployer;

    // the number of members
    uint256 internal member_count;
    mapping(address => Member) internal pool;
    address[] members;

    bool internal is_closed;

    // important dates
    uint internal duration = 30 days;
    uint internal creation_date;
    uint internal start_date;
    uint internal close_date;

    // events
    event MemberAdded(string chit_name, address indexed manager_address, address indexed member_address);
    event FundsReceived(string chit_name, address indexed member_address, uint amount);
    event ChitCreated(string chit_name, address indexed member_address, uint member_count);
    // modifiers

    modifier onlyTopLevel() {
        require(msg.sender == fund_manager.addr || msg.sender == deployer, "The sender of the transaction does not have enough escalation");
        _;
    }
    modifier onlyMember() {
        require(is_member(msg.sender), "The sender is not a member");
        _;
    }

    modifier onlyActive() {
        require((now > start_date && now < close_date) && is_closed == false, "The chit is not active");
        _;
    }

  // event ChitCreated(address indexed manager_address, uint256 date);


    constructor(string name, address _manager_address, uint256 _chit_value, uint256 _fee_per_cent, uint _member_count) public {
        
        fund_manager.fee = _fee_per_cent;
        fund_manager.addr = _manager_address;
        chit_value = _chit_value;
        member_count = _member_count;
        creation_date = now;
        chit_per_member = chit_value / member_count;
        uni = msg.sender;
        chit_name = name;

    }

    function () public payable onlyActive {
      // if the sender is not in the chit fund
        require(is_member(msg.sender), "The sender is not a member");
        pool[msg.sender].funds_sent[current_payment_cycle()] += msg.value;

    }

   
    function start_chit_fund() public onlyTopLevel {
        require(members.length == member_count, "The member count is not complete yet");
        start_date = now;
        close_date = start_date + (member_count * duration);
    }

    function current_payment_cycle() view public returns (uint) {
        require(now > start_date, "The chit should have started");
        return (now - start_date) / duration;
    }

    function get_uni() public view returns (address) {
        return uni;
    }

    function get_fund_manager_address() public view returns (address) {
        return fund_manager.addr;
    }
    
    function is_member(address _addr) public view returns (bool) {
        return (pool[_addr].date_joined != 0);
    }

    function set_description(string _description) public onlyTopLevel {
        chit_description = _description;
    }

    function get_member_list() public view returns (address[]) {
        return members;
    }
    
    function have_all_member_payed_in_this_cycle() public view returns (bool) {
        bool payed = true;
        uint current_cycle = current_payment_cycle();
        for(uint i = 0; i < members.length; i++) {
            // check if all the members payed in the current cycle or not
            if (pool[members[i]].funds_sent[current_cycle] != chit_per_member) {
                payed = false;
            } 
        }

        return payed;
    }

  
    function add_member() public {
        pool[msg.sender].addr = msg.sender;
        pool[msg.sender].date_joined = now;
        members.push(msg.sender);
        emit MemberAdded(chit_name, fund_manager.addr, msg.sender);
    }


     // this method is used to release chit fund amount to one random member
    // function release_chit_fund()





}