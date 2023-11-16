import React from 'react';
import logo from '../logodesigns.png';
import background from '../abstract-vector-grunge-surface-texture-background-photo.jpg';
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
            <div className="App">
                
                <Navbar></Navbar>

                    <div className="image-container">
                        <div className="DateTimeDaynew">
                            <background-blur className = "DateTimeDaynew">
                                <DateTime></DateTime>
                            </background-blur>  
                        </div>
                        <div className = "About-Ivan">
                            <background-blur className = "About-Ivan">
                                <p>Ivan Ladutska</p>
                                <p>ialadutska@student.ysu.edu</p>
                                <p>Computer Science major </p>
                                <p>and Math minor</p>
                                <p>Bruh</p>
                            </background-blur>
                        </div>

                        <div className = "About-Faiza">
                            <background-blur className = "About-Faiza">
                                <p>Faiza Jalees</p>
                                <p>fjalees01@student.ysu.edu</p>
                                <p>Computer Science major </p>
                                <p>and Math minor</p>
                                <p>I have nothing left to say</p>
                            </background-blur>
                        </div>

                        <div className = "About-Fatima">
                            <background-blur className = "About-Fatima">
                                <p>Fatima Wasim</p>
                                <p>fwasim@student.ysu.edu</p>
                                <p>Computer Science major </p>
                                    <p>and Math minor</p>
                                <p>Trying to work on the code</p>
                            </background-blur>
                        </div>

                        <div className = "About-Nikolina">
                            <background-blur className = "About-Nikolina">
                                <p>Nikolina Drobnjak</p>
                                <p>ndrobnjak@student.ysu.edu</p>
                                <p>Computer Science and </p>
                                <p>Economics double major</p>
                                <p>I am Nikogirl</p>
                            </background-blur>
                        </div>

                        <div className = "About-Jenelle">
                            <background-blur className = "About-Jenelle">
                                <p>Jenelle Harrington</p>
                                <p>jharrington01@student.ysu.edu</p>
                                <p>Computer Science major </p>
                                <p>and Math minor</p>
                                <p>They call me Juna</p>
                            </background-blur>
                        </div>

                    <div className="search-container">
                    <input type="text" placeholder="Search..."></input>
                    <button type="submit">Search</button></div>
                    {<img className = "background"/>}
                    {<img src={logo} className="logo" alt="logo" />}
                    {<img src={group} className="group" alt="group photo" />}
                    

                </div>
            </div>
        </div>
    );
}

export default Testing;