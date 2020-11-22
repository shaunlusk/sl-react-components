import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DateDisplay } from './components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SL-React-Components Demo Page</h1>        
      </header>
      <div>
        <h2>DateDisplay</h2>
        <DateDisplay datetime={new Date()} format="YYYYMMDD"></DateDisplay>
      </div>
    </div>
  );
}

export default App;
