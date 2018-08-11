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


contract Chit {

    using SafeMath for uint256;

    address uni;
    uint256 chit_value;
    string chit_description;


    struct Manager {
        address addr;
        uint fee;
    }

    struct Member {
        address addr;
        // this is the mapping of timestamp => gwei recieved by the members;
        mapping(uint => uint256) funds_received;

        // date joined the pool
        uint date_joined;
    }

    Manager internal fund_manager;
    address internal deployer;

    // the number of participants
    uint internal participant_count;
    mapping(address => Member) internal pool;

    
    bool internal is_active;
    bool internal is_closed;

    // important dates
    uint internal creation_date;
    uint internal start_date;
    uint internal close_date;



    // events
    event MemberAdded(address indexed manager_address, address indexed );

    // modifiers

    modifier isTopLevel() {
        require(msg.sender == fund_manager.addr || msg.sender == deployer, "The sender of the transaction does not have enough escalation");
        _;
    }

  // event ChitCreated(address indexed manager_address, uint256 date);


    constructor(address _manager_address, uint256 _chit_value, uint256 _fee_per_cent) public {
        fund_manager.fee = _fee_per_cent;
        fund_manager.addr = _manager_address;
        chit_value = _chit_value;
        creation_date = now;
    }

    function () public payable {
      // if the sender is not in the chit fund
        if (!is_member(msg.sender)) {
            msg.sender.transfer(msg.value);
        }
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

    // function add_member(address _)




}