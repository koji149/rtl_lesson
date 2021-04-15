import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import RenderInput from "./RenderInput";
import MockServer from "./MockServer"
import './App.css';
import FrameworkList from './FrameworkList';
import Redux from './Redux';
import ReduxAsync from './ReduxAsync';
import CustomHooks from './CustomHooks';

function App() {

  const output = (text) => {
    console.log(text);
  };

  const data = [{
    id:1, item:"React"
  },{
    id:2, item:"Angular"
  },{
    id:2,
    item:"Vue"
  }]


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <RenderInput outputConsole={output} /> 
        <FrameworkList frameworks={data}/>
        <MockServer/>
        <Redux/>
        <ReduxAsync/>
        <CustomHooks/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
