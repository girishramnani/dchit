import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, Navbar } from 'react-bootstrap';

import EmbarkJS from 'Embark/EmbarkJS';
import DNavbar from './components/navbar';





import './dapp.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      whisperEnabled: false,
      storageEnabled: false
    }
  }

  componentDidMount(){ 
    EmbarkJS.onReady(() => {
      if (EmbarkJS.isNewWeb3()) {
        EmbarkJS.Messages.Providers.whisper.getWhisperVersion((err, version) => { 
          if(!err)
              this.setState({whisperEnabled: true})
            else
              console.log(err);
        });
      } else {
        if (EmbarkJS.Messages.providerName === 'whisper') {
          EmbarkJS.Messages.getWhisperVersion((err, version) => {
            if(!err)
              this.setState({whisperEnabled: true})
            else
              console.log(err);
          });
        }
      }

      this.setState({
        storageEnabled: true
      });
    });
  }


  render(){
    return (<div>
     <DNavbar />
    </div>);
  }
}

ReactDOM.render(<App></App>, document.getElementById('app'));
