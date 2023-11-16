import React from 'react';
import logo from '../logodesigns.png';
import background from '../cityview.jpg';
import './LocalNews.css';
import DateTime from '../DateTime.js';
import Navbar from '../components/Navbar.js';

function LocalNews() {

    const homeStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    };

    return (
        <div style={homeStyle}>
            <div className="App">

                <Navbar></Navbar>

                <div className="image-container">
                    <div className="DateTimeDay">
                        <DateTime></DateTime>
                    </div>
                    {<img className="background" />}
                    {<img src={logo} className="logo" alt="logo" />}

                </div>
            </div>
        </div>
    );
}

export default LocalNews;