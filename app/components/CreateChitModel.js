
import React from 'react';
import {Button, ButtonToolbar,Input,Modal} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
class CreateChitModel extends React.Component {
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
      };
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
        const createAccount = DTwitter.methods.create_chit(this.state.chit.chit_name,this.state.chit.chit_value,this.state.chit.fee_per_cent,this.state.chit.member_count);
  
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
      const popover = (
        <Popover id="modal-popover" title="popover">
          very popover. such engagement
        </Popover>
      );
      const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
      const bsStyle={
          modelHeder:{
            background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
          }
      }

      return (
        <div>
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
        </div>
      );
    }
  }
  
  render(<CreateChitModel  />);