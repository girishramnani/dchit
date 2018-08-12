import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, Navbar } from 'react-bootstrap';
import { BrowserRouter, Route} from 'react-router-dom'
import EmbarkJS from 'Embark/EmbarkJS';
import DNavbar from './components/navbar';
import ChitsList from './components/chits_list';
import ChitDetails from './components/ChitDetails';
import MyChitsList from './components/my_chits_list';
import MyProfile from './components/profile';
import Home from './components/home';



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

     <div className="container pages">
      <Route exact path="/" component={Home}/>
      <Route path="/chits" component={ChitsList}/>
      <Route path="/chitdetails/:usercode" component={ChitDetails}/>
      <Route path="/my-chits" component={MyChitsList}/>
      <Route path="/profile" component={MyProfile}/>
     </div>
    </div>);
  }
}

ReactDOM.render(
 <BrowserRouter>
 <App/>
</BrowserRouter>
, document.getElementById('app'));
