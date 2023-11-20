import React, { useContext } from 'react';
import { AppContext, AppProvider } from './AppContext';
import logo from './logodesigns.png';
import background from './mountains.jpg';
import './App.css';
import DateTime from './DateTime.js';
import Navbar from './components/Navbar.js';


function App() {

  const {
    onInputChange,
    userInput,
    fetchWeatherData,
    latitude,
    longitude,
    onOptionSelect,
    options,
    hourlyData,
    city
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
        {<img src={logo} className="logo" alt="logo" />}

      </div>
      <div>

        {hourlyData && hourlyData.periods && hourlyData.periods.length > 1 ? (
          <div>

            <p>Lat: {latitude}</p>
            <p>Lon: {longitude}</p>
            <p>City: {city}</p>
            <p>Temp now: {hourlyData.periods[0].temperature}</p>
            <p>Temp in 6 hours: {hourlyData.periods[6].temperature}</p>
            <p>Temp in 12 hours: {hourlyData.periods[12].temperature}</p>
            <p>Temp in 18 hours: {hourlyData.periods[18].temperature}</p>
            <p>Temp in 24 hours: {hourlyData.periods[24].temperature}</p>
            <p>Temp in 156 hours: {hourlyData.periods[155].temperature}</p>
            <p>Wind Speed now: {hourlyData.periods[0].windSpeed}</p>
            <p>Wind Speed in 6 hours: {hourlyData.periods[6].windSpeed}</p>
            <p>Wind Speed in 12 hours: {hourlyData.periods[12].windSpeed}</p>
            <p>Wind Speed in 18 hours: {hourlyData.periods[18].windSpeed}</p>

          </div>
        ) : (
          <p>Loading...</p>
        )}

      </div>
    </div>

  );
}

function AppWrapper() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

export default AppWrapper;
