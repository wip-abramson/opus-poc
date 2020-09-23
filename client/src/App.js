import React from 'react';
import logo from './logo.svg';
import './App.css';
import Invite from './Invite';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Invite/>
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
