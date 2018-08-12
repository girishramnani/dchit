import React from 'react';
import ChitsRow from './ChitRow';
import {Button, ButtonToolbar,Input,Modal} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
export default class ChitsList extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);

      this.state = {
        show: false,
        chit:{
                chit_name:"",     
                chit_value:"",     
                chit_fee_per_cent:"",     
                member_count:""
            }   
      }
    }


    handleClose() {
      this.setState({ show: false });
    }

    handleShow(e) {
      this.setState({ show: true });
    }
  
    handleCreateChitfund() {
      this.setState({ show: true });
    }


    _handleClick = async () => {

      this.setState({ isLoading: true });
      const { username, description } = this.state;
  
      try {
        
        // set up our contract method with the input values from the form
        // get a gas estimate before sending the transaction
        const createAccount = DTwitter.methods.create_chit(this.state.chit.chit_name,this.state.chit.chit_value,this.state.chit.fee_per_cent,this.state.chit.fee_per_cent);
  
        // get a gas estimate before sending the transaction
        const gasEstimate = await createAccount.estimateGas({ from: web3.eth.defaultAccount });
       
        // send the transaction to create an account with our gas estimate
        // (plus a little bit more in case the contract state has changed).
        const result = await createAccount.send({ from: web3.eth.defaultAccount,  gas: gasEstimate + 1000 });
        // send the transaction to create an account with our gas estimate
        // (plus a little bit more in case the contract state has changed).
  
        // check result status. if status is false or '0x0', show user the tx details to debug error
        if (result.status && !Boolean(result.status.toString().replace('0x', ''))) { // possible result values: '0x0', '0x1', or false, true
          return this.setState({ isLoading: false, error: 'Error executing transaction, transaction details: ' + JSON.stringify(result) });
        }
  
        // Completed of async action, set loading state back
        this.setState({ isLoading: false });
  
        // tell our parent that we've created a user so it
        // will re-fetch the current user details from the contract
        this.props.onAfterUserUpdate();
  
        // redirect user to the profile update page
        this.props.history.push('/update/@' + username);
  
      } catch (err) {
        // stop loading state and show the error
        this.setState({ isLoading: false, error: err.message });
      };
    }

  
    render() {
      
        let rows = [];
        let style={
                    listbox:{
                        listStyleType:"none"
                    },
                    buttonTable:{
                        padding:"8px 16px",
                        fontSize: ".875em",
                        fontWeight:"700",
                        backgroundColor:"#9282fc",
                        color:"#fff",
                        margin:"4px"
                    },
                    buttonGroup:{
                        position: "absolute"
                    },
                    btnPurple:{
                        
                    },
                    modelHeder:{
                      background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
                    },
                    textModel:{
                      color:"white",
                      margin:"0 auto",

                    }
                
            };
        for (var i = 0; i < 3; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            rows.push(<ChitsRow key={i} />);
        }


        return (
        <div className="coin-list">
         <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header style={style.modelHeder}  closeButton>
              <Modal.Title style={style.textModel}>
                    Create  new ChitFund
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form>
                <div className="form-group">
                <label>
              Name of chitfund
                </label>
                <br />
                <input
                    name="chit_name"
                    value={this.state.chit.chit_name}
                    type="text"
                     />
                </div>
                <div className="input-group input-group-lg">
                <label>
                Chit fund Amount:
               </label>
               <br />
               <input
                    name="chit_value"
                    value={this.state.chit_value}
                    onChange={this.handleInputChange}
                />
               </div>
                <br />
                <div className="input-group input-group-lg">
                <label>
                Amount per member:
                </label>
                <br />
                <input
                    name="numberOfmember"
                    type="number"
                    value={this.state.numberOfGuests}
                    onChange={this.handleInputChange}
                 />
                </div>
                <br />
                <div className="input-group input-group-lg">
                <label>
                Presenatage of fee Organizer:
                </label>
                <br />
                <input
                    name="fee_per_cent"
                    type="number"
                    value={this.state.fee_per_cent}
                    onChange={this.handleInputChange}
                 />
                </div>
                <div className="input-group input-group-lg">
                <label>
                Member count:
                </label>
                <br />
                <input
                    name="member_count"
                    type="number"
                    value={this.state.member_count}
                    onChange={this.handleInputChange}
                 />
                </div>
            </form> 
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={this.handleSubmit}>Create New ChitFund</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
         <div className="row">
            <div className="col-xs-12 col-md-4">
              <h2 className="section-title">ChitFund List</h2>
            </div>
            <div className="pull-right">
              <Button onClick={this.handleShow} style={style.buttonTable} bsStyle="primary">Create </Button>
            </div>
         </div>  
        <div className="table table-responsive form-class">
          <table className="table coin-list-table">
            <thead>
              <tr>
                <th width="18%">NAME </th>
                <th width="14.5%">Total member</th>
                <th width="16%">Amount</th>
                <th width="14.5%">Total Amount Get</th>
                <th width="12.5%">Duration</th>
                <th width="10.5%">Status</th>
                <th width="10%">
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>  
                 <LinkContainer to="/chitdetails/2">
                    <div className="tbl-cap-title">Bitcoin Cash</div>
                 </LinkContainer>
                 </td>
                <td>
                  <div className="tbl-change">
                  <i className="tbl-arrow-down"></i>21.12 %</div>
                </td>
                <td>
                  <div className="tbl-price">$0.00002</div>
                  <div className="tbl-price-2">0.0002192</div>
                </td>
                <td className="tbl-graph">
                    
                </td>
                <td>
                  <div className="tbl-price 24hr-up"><i className="tbl-arrow-up"></i>$0.00002</div>
                </td>
                <td>
                  <div className="tbl-coin">12.29M</div>
                </td>  
                <td>
                  <div className="tbl-mcap">
                  <div style={style.buttonGroup}>

                      <Button style={style.buttonTable} bsStyle="primary">Join</Button>
                      <Button style={style.buttonTable} bsStyle="primary">View</Button>
                  </div>
  
                  </div>
                </td>                              
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <ul className="pagination">
            <li><a href="#" className="active">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li className="pagination-dots">...</li>
            <li><a href="#" className="page-last">30</a></li>
          </ul>          
        </div>
     </div>
            
        )
    }
}