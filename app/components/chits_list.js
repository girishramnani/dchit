import React from 'react';
import ChitsRow from './ChitRow';
import {Button, ButtonToolbar,Input,Modal} from 'react-bootstrap';

export default class ChitsList extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);

      this.state = {
        show: false
      };
    }


    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
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
                    name="isGoing"
                    type="text"
                     />
                </div>
                <div className="input-group input-group-lg">
                <label>
                Number of guests:
               </label>
               <br />
               <select
                    name="numberOfmember"
                    value={this.state.numberOfGuests}
                    onChange={this.handleInputChange}
                >
                <option></option>
                </select>
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
            </form> 
            </Modal.Body>
            <Modal.Footer>
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
                  <div className="tbl-cap-title">Bitcoin Cash</div>
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