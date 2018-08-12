import React from 'react';
import ChitsRow from './ChitRow';
import {Button, ButtonToolbar,Input,Modal} from 'react-bootstrap';

export default class ChitDetails extends React.Component {
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
                    headerCard:{
                      background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
                      padding:"10px",
                      color:"white",
                      fontWeight: "300",
                      textTransform: "uppercase",
                      fontSize:"3.2rem"
                    },
                    wapper:{
                        background:"#fff",
                        maxWidth: "1200px",
                        margin:"20px auto 40px",
                        borderRadius: "4px",
                        boxShadow:"0 10px 20px rgba(51,51,51,.1)",
                        borderBottom:"10px solid #333",
                        hegiht:"800px"
                    },
                    textModel:{
                      color:"white",
                      margin:"0 auto"
                     }
                
            };
        for (var i = 0; i < 3; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            rows.push(<ChitsRow key={i} />);
        }

        return (
        <div className="coin-list">
         <div className="row" style={style.wapper}>
            <div className="" style={style.headerCard}>
                <div className="" style={style.headerCard}>
                    <ul  class="heading-items -live">
                        <li  className="heading-item">
                            ChitFun data work
                        </li>                    
                    </ul>    
                </div>
                <div className="" style={style.bodyCard}>
                   
                </div>    
            </div>    
         </div>  
        
     </div>
            
        )
    }
}