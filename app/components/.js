
import React from 'react';



export default class ChitsRow extends React.Component {

    render() {
        let style={
                 toolbox:{
                   
                },
                textbox:{
                        fontWeight: 600,
                        fontSize: "24px",
                        fontSize: "1.5rem",
                        margin: 0,
                        marginTop: "-14px",
                        color:"#f8f8f8"
                   },
                   box:{
                    position: "relative",
                    height: "200px",
                    boxShadow:"0 10px 30px rgba(51,51,51,.1)",
                    transition: "all .4s ease",
                    borderRadius: "4px",
                    overflow: "hidden",
                    margin:"10px",
                    border:"1px solid  #e3e8ed"
                
                    //  backgroundImage: linear-gradient(229deg,#acff84,#98e3ff)';
                    
                },
                chitboxHeader:{
                    background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
                    color:"#f8f8f8"
                },
                headingStyle:{
                    listStyleType:"none"
                }



            };

        
        return (
            <li style={style.box} className="col-md-3">  
            <div  style={style.toolbox}>
                <div style={style.chitboxHeader}>
                        <ul className="heading-items -live" style={style.headingStyle}>
                            <li className="heading-item" >
                                <h3 className="heading-title" >lucky9 lottery</h3>
                            </li>
                            <li clasclassNames="heading-item" >
                                <span className="heading-tagline" >
                                        Smart Contract based lottery
                                </span>
                            </li>
                        </ul>
                </div>
                <div className="topp-box-inner" style={style.textbox}>
                     <div style={style.chitboxHeader}>
                         <h5 >Ethereum Classic </h5>
                     </div>
                    <div className="top-coin-price coin-topp-price-ETC">$13.71</div>
                    <span className="topp-per ">
                    <i className="coin-topp-down"></i>
                    -4.23%
                    </span>
                    <span className="top-image">
                        
                    </span>
                </div>
            </div>    
          </li>  
            
    );
}  

};