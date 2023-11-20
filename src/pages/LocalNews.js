import React, { useContext } from 'react';
import { AppContext, AppProvider } from '../AppContext';
import logo from '../logodesigns.png';
import background from '../cityview.jpg';
import '../App.css';
import DateTime from '../DateTime.js';
import Navbar from '../components/Navbar.js';

function LocalNews() {

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
            <div className="App">

                <Navbar></Navbar>
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

function AppWrapper() {
    return (
        <AppProvider>
            <LocalNews />
        </AppProvider>
    );
}

export default AppWrapper;