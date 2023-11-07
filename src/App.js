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
        <div class="taskbar">
                <nav>
                    <ul>
                        <li><a href="https://www.bbc.com/weather">Home</a></li>
                        <li><a href="one.html">Local News</a></li>
                        <li><a href="two.html">Historical Data</a></li>
                        <li><a href="two.html">Daily Advisory</a></li>
                        <li><a href="two.html">About Us</a></li>
                        <li><a href="two.html">Link to API</a></li>
                    </ul>
                </nav>
            </div>
        </div>
  );
}

export default App;
