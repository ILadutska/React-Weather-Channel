import React, { useContext } from 'react';
import { AppContext, AppProvider } from './AppContext';
import logo from './resources/logodesigns.png';
import background from './resources/mountains.jpg';
import './App.css';
import DateTime from './DateTime.js';
import Navbar from './components/Navbar-pages.js';
import NavbarHours from './components/Navbar-hours.js';


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
      <NavbarHours></NavbarHours>
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
          <div className="weather-info-container">
            <div className="weather-box">
              <p>Latitude: {latitude}</p>
            </div>
            <div className="weather-box">
              <p>Longitude: {longitude}</p>
            </div>
            <div className="weather-box">
              <p>City: {city}</p>
            </div>
            <div className="weather-box">
              <p>Temperature now: {hourlyData.periods[0].temperature}°C</p>
            </div>
            <div className="weather-box">
                <p>Temperature in 6 hours: {hourlyData.periods[6].temperature}°C</p>
                </div>
            <div className="weather-box">
              <p>Temperature in 12 hours: {hourlyData.periods[12].temperature}°C</p>
            </div>
            <div className="weather-box">
              <p>Temperature in 18 hours: {hourlyData.periods[18].temperature}°C</p>
            </div>
            <div className="weather-box">
              <p>Temperature in 24 hours: {hourlyData.periods[24].temperature}°C</p>
            </div>
            <div className="weather-box">
              <p>Temperature in 156 hours: {hourlyData.periods[155].temperature}°C</p>
            </div>
            <div className="weather-box">
              <p>Wind Speed now: {hourlyData.periods[0].windSpeed} m/s</p>
            </div>
            <div className="weather-box">
              <p>Wind Speed in 6 hours: {hourlyData.periods[6].windSpeed} m/s</p>
            </div>
            <div className="weather-box">
              <p>Wind Speed in 12 hours: {hourlyData.periods[12].windSpeed} m/s</p>
            </div>
            <div className="weather-box">
              <p>Wind Speed in 18 hours: {hourlyData.periods[18].windSpeed} m/s</p>
            </div>
            <div className="weather-box">
              <p>Wind Speed in 24 hours: {hourlyData.periods[24].windSpeed} m/s</p>
            </div>
            <div className="weather-box">
              <p>Wind Speed in 156 hours: {hourlyData.periods[155].windSpeed} m/s</p>
            </div>
            <div className="weather-box">
              <p>Humidity now: {hourlyData.periods[0].humidity}%</p>
            </div>
            <div className="weather-box">
              <p>Humidity in 6 hours: {hourlyData.periods[6].humidity}%</p>
            </div>
            <div className="weather-box">
              <p>Humidity in 12 hours: {hourlyData.periods[12].humidity}%</p>
            </div>
            <div className="weather-box">
              <p>Humidity in 18 hours: {hourlyData.periods[18].humidity}%</p>
            </div>
            <div className="weather-box">
              <p>Humidity in 24 hours: {hourlyData.periods[24].humidity}%</p>
            </div>
            <div className="weather-box">
              <p>Humidity in 156 hours: {hourlyData.periods[155].humidity}%</p>
            </div>
           
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
