import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppProvider } from './AppContext';
import logo from './resources/logodesigns.png';
import background from './resources/mountains.jpg';
import './App.css';
import DateTime from './DateTime.js';
import Navbar from './components/Navbar-pages.js';
import NavbarHours from './components/Navbar-hours.js';
import NavbarDays from './components/Navbar-days.js';

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
    dailyData,
    city,
    alertData
  } = useContext(AppContext);

  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  const handleHourSelection = (numVal) => {
    setSelectedDay('');
    console.log('Selected Hour:', numVal);
    setSelectedHour(numVal);
    console.log('Updated: ', selectedHour);
  };

  const handleDaySelection = (numVal) => {
    setSelectedHour('');
    console.log('Selected Day:', numVal);
    setSelectedDay(numVal);
    console.log('Updated: ', selectedDay);
  };

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
      <NavbarDays onDaySelect={handleDaySelection} />
      <NavbarHours onHourSelect={handleHourSelection} />
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
            <div className="city">
              <p>City: {city}</p>
            </div>
            <div className="latlon">
              <p>LAT: {latitude} LON: {longitude}</p>
            </div>
            {selectedHour !== '' ? (
              <div className="weatherrundown">
                <div className="weather-box">
                  <p>Hour: {selectedHour}</p>
                </div>
                <div className="weather-box">
                  <p>Temperature: {hourlyData.periods[selectedHour].temperature}°F</p>
                </div>

                <div className="weather-box">
                  <p>Precipitation: {hourlyData.periods[selectedHour].probabilityOfPrecipitation.value}%</p>
                </div>

                <div className="weather-box">
                  <p>Wind Speed: {hourlyData.periods[selectedHour].windSpeed}</p>
                </div>
                <div className="weather-box">
                  <p>Wind Direction: {hourlyData.periods[selectedHour].windDirection}</p>
                </div>
                <div className="weather-box">
                  <p>Humidity: {hourlyData.periods[selectedHour].relativeHumidity.value}%</p>
                </div>
              </div>
            ) : selectedDay !== '' ? (
              <div className="weatherrundown">
                <div className="weather-box">
                  <p>Day: {dailyData.periods[selectedDay].name}</p>
                </div>
                <div className="weather-box">
                  <p>Temperature: {dailyData.periods[selectedDay].temperature}°F</p>
                </div>

                <div className="weather-box">
                  <p>Precipitation: {dailyData.periods[selectedDay].probabilityOfPrecipitation.value}%</p>
                </div>

                <div className="weather-box">
                  <p>Wind Speed: {dailyData.periods[selectedDay].windSpeed}</p>
                </div>

                <div className="weather-box">
                  <p>Wind Direction: {dailyData.periods[selectedDay].windDirection}</p>
                </div>

                <div className="weather-box">
                  <p>Humidity: {dailyData.periods[selectedDay].relativeHumidity.value}%</p>
                </div>
              </div>
            ) : null}

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
