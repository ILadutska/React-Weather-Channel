import React, { useState, useEffect } from 'react';
import logo from './logodesigns.png';
import background from './mountains.jpg';
import './App.css';
import DateTime from './DateTime.js';
import Navbar from './components/Navbar.js';

function App() {

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

  const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("")
  const [userInput, setUserInput] = useState('')
  const [options, setOptions] = useState([]);
  const [weatherData, setWeatherData] = useState([{}])
  const [hourlyData, setHourlyData] = useState([{}])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (!isInitialFetchDone && latitude !== '' && longitude !== '') {
      fetchWeatherData(latitude, longitude);
      setIsInitialFetchDone(true);
    }
  }, [latitude, longitude, isInitialFetchDone]);

  const getSearchOption = (value) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value},,US&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setOptions(data))
  }

  const onInputChange = (e) => {
    const value = e.target.value
    setUserInput(value)
    if (value === '') return
    getSearchOption(value)
  }

  const onOptionSelect = (option) => {
    setLatitude(option.lat)
    setLongitude(option.lon)
    setCity(option.name + ', ' + option.state + ', ' + option.country)
    fetchWeatherData(option.lat, option.lon)
  }

  const fetchWeatherData = (latitude, longitude) => {
    fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        return data;
      })
      .then((data) => {
        if (data && data.properties && data.properties.forecastHourly) {
          return fetch(data.properties.forecastHourly);
        } else {
          throw new Error('No hourly forecast available');
        }
      })
      .then((res) => res.json())
      .then((hourlyData) => {
        setHourlyData(hourlyData.properties);
        console.log(hourlyData.properties); // Log fetched hourly data
      })
      .catch((error) => console.error('Error fetching data:', error));
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

export default App;
