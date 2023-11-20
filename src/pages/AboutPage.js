import React, { useContext } from 'react';
import { AppContext, AppProvider } from '../AppContext';
import logo from '../resources/logodesigns.png';
import background from '../resources/black.jpg';
import './AboutPage.css';
import DateTime from '../DateTime.js';
import Navbar from '../components/Navbar-pages.js';
import group from '../resources/group.jpg';

function Testing() {

    const {
        onInputChange,
        userInput,
        fetchWeatherData,
        latitude,
        longitude,
        onOptionSelect,
        options
    } = useContext(AppContext);

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
                        <div className="search-input">
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={onInputChange}
                                value={userInput}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        fetchWeatherData(latitude, longitude);
                                    }
                                }}
                            />
                            <button type="submit" onClick={() => onOptionSelect(options)}>
                                Search
                            </button>
                        </div>
                        <ul className="options-list">
                            {options.map((option, index) => (
                                <li key={option.name + '-' + index}>
                                    <button onClick={() => onOptionSelect(option)}>
                                        {option.name + ', ' + option.state + ', ' + option.country}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {<img className="background" />}
                    {<img src={logo} className="logo" alt="logo" />}
                    {<img src={group} className="group" alt="group photo" />}


                </div>
            </div>
        </div>
    );
}

function AppWrapper() {
    return (
        <AppProvider>
            <Testing />
        </AppProvider>
    );
}

export default AppWrapper;
