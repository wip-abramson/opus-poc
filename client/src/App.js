import React from 'react';
import logo from './logo.svg';
import './App.css';
import Invite from './Invite';
import {checkActive} from "./api/connections";

function App() {

  let [connectionId, setConnectionId] = React.useState(null)
    let [connectionActive, setConnectionActive] = React.useState(false)

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
