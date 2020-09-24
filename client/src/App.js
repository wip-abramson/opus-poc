import React from 'react';
import logo from './logo.svg';
import './App.css';
import Invite from './Invite';
import {checkActive} from "./api/connections";
import IssueCredential from "./IssueCredential";

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
          <h2>OpenMined OPUS Demo</h2>

          {
              connectionActive ?

                  <IssueCredential connectionId={connectionId} ownershipProof={ownershipProof}/>
                  : <>
                      <h3>Scan this QrCode to make a connection</h3>
                      <div>
                          You should be able to use any of the following apps:
                          <ul>
                              <li>esatus</li>
                              <li>Trinsic</li>
                              <li>Connect.Me</li>
                          </ul>
                      </div>
                      <Invite setConnectionId={setConnectionId} setOwnershipProof={setOwnershipProof}/></>
          }
      </header>
    </div>
  );
}

export default App;
