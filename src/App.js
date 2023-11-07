import React from 'react';
import logo from './logodesigns.png';
import background from './mountains.jpg';
import './App.css';
import DateTime from './DateTime.js';

function App() {
  return (
    <div className="App">
        <div className="image-container">
        <div className = "DateTimeDay"><DateTime></DateTime></div>
        {<img src={background} className="background" alt="mountains"/>}
        
        {<img src={logo} className="cw-logo" alt="logo" />}
        
        </div>
        <div className="search-container">
        <input type="text" placeholder="Search..."></input>
        <button type="submit">Search</button></div>
        
        
    </div>
  );
}

export default App;
