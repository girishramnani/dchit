import React from 'react';
import ChitsRow from './ChitRow';
import {Button, ButtonToolbar,Input,Modal} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Organizer extends React.Component {
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
                    Become Organizer
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form>

                <div className="form-group">
                <label>
              Name of organization
                </label>
                <br />
                <input
                    name="name"
                    type="text"
                     />
                </div>

                <br />
                <div className="input-group input-group-lg">
                <label>
                Total members
                </label>
                <br />
                <input
                    name="member"
                    type="number"
                    value={this.state.numberOfGuests}
                    onChange={this.handleInputChange}
                 />
                </div>

                <br />
                <div className="input-group input-group-lg">
                <label>
                Example field
                </label>
                <br />
                <input
                    name="example"
                    type="number"
                    value={this.state.numberOfGuests}
                    onChange={this.handleInputChange}
                 />
                </div>
            </form> 
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={this.handleClose}>Save</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
         <div className="row">
            <div className="col-xs-12 col-md-4">
              <h2 className="section-title">Become Organizer</h2>
              <p>Become organizer today by clicking below button</p>
            </div>
         </div>
         <div className="text-center">
              <Button onClick={this.handleShow} style={style.buttonTable} bsStyle="primary">Become Organizer </Button>
        </div>


     </div>
            
        )
    }
}