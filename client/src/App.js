import React from 'react';
import logo from './logo.svg';
import './App.css';
import Invite from './Invite';
import {checkActive} from "./api/connections";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


function App() {

  let [connectionId, setConnectionId] = React.useState(null)
    let [connectionActive, setConnectionActive] = React.useState(false)
    React.useEffect(() => {
        const interval = setInterval(() => {
            console.log('This will run every second!');
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    React.useEffect(() => {
        if (connectionId) {
            checkActive(connectionId).then(response => {
                console.log("ACTIVE", response.data.active)
                setConnectionActive(response.data.active)
            })
        }

    }, [connectionId])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Invite setConnectionId={setConnectionId}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          TEST THE CONTROLLER
        </a>
      </header>
    </div>
  );
}

export default App;
