import React from 'react';
import logo from './logo.svg';
import './App.css';
import Invite from './Invite';
import {checkActive} from "./api/connections";
import OpusForm from "./OpusForm";

function App() {

  let [connectionId, setConnectionId] = React.useState(null)
    let [connectionActive, setConnectionActive] = React.useState(false)
    let [ownershipProof, setOwnershipProof] = React.useState(null)

    React.useEffect(() => {

        if (connectionId && !connectionActive) {
            const interval = setInterval(() => {
                checkActive(connectionId).then(response => {
                    console.log("ACTIVE", response.data.active)
                    if (response.data.active) {
                        setConnectionActive(response.data.active)
                        return () => clearInterval(interval);
                    }

                })
            }, 2000);
            return () => clearInterval(interval);
        }


    }, [connectionId, connectionActive])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          {
              connectionActive ?
                  <OpusForm connectionId={connectionId} ownershipProof={}/>
                  : <Invite setConnectionId={setConnectionId} setOwnershipProof={setOwnershipProof}/>
          }
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
