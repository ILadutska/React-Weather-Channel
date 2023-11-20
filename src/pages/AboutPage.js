import React from 'react';
import logo from '../logodesigns.png';
import background from '../black.jpg';
import './AboutPage.css';
import DateTime from '../DateTime.js';
import Navbar from '../components/Navbar.js';
import group from '../group.jpg';

function Testing() {

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
            <Navbar></Navbar>
            <div className="App">

                <div className="image-container">
                    <div className="DateTimeDaynew">

                        <DateTime></DateTime>

                    </div>
                    <div className="About-Ivan">

                        <p>Ivan Ladutska</p>
                        <p>ialadutska@student.ysu.edu</p>

                    </div>

                    <div className="About-Faiza">

                        <p>Faiza Jalees</p>
                        <p>fjalees01@student.ysu.edu</p>

                    </div>

                    <div className="About-Fatima">

                        <p>Fatima Wasim</p>

                        <p>fwasim@student.ysu.edu</p>


                    </div>

                    <div className="About-Nikolina">

                        <p>Nikolina Drobnjak</p>
                        <p>ndrobnjak@student.ysu.edu</p>

                    </div>

                    <div className="About-Jenelle">

                        <p>Jenelle Harrington</p>
                        <p>jharrington01@student.ysu.edu</p>


                    </div>

                    <div className="search-container">
                        <input type="text" placeholder="Search..."></input>
                        <button type="submit">Search</button></div>
                    {<img className="background" />}
                    {<img src={logo} className="logo" alt="logo" />}
                    {<img src={group} className="group" alt="group photo" />}


                </div>
            </div>
        </div>
    );
}

export default Testing;