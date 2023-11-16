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

  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        // Fetch weather data when the component mounts
        fetchWeatherData(latitude, longitude);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts


  useEffect(() => {
    if (latitude !== '' && longitude !== '') {
      fetchWeatherData(latitude, longitude);
    }
  }, [latitude, longitude]);


  const fetchWeatherData = (lat, lon) => {
    fetch(`https://api.weather.gov/points/${lat},${lon}`)
      .then((response) => response.json())
      .then((data) => {
        const forecastHourlyUrl = data.properties.forecastHourly;

        // Fetch forecast hourly data
        return fetch(forecastHourlyUrl);
      })
      .then((response) => response.json())
      .then((forecastHourlyData) => {
        setWeatherData(forecastHourlyData.properties.periods);
      })
      .catch((error) => {
        console.error('Error fetching forecast hourly data:', error);
      });
  };

  return (
    <div style={homeStyle}>
      <Navbar></Navbar>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          onChange={e => setCity(e.target.value)}
          value={city}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              fetchWeatherData(latitude, longitude);
            }
          }}
        ></input>

        <button type="submit">Search</button></div>

      <div className="image-container">
        <div className="DateTimeDay">
          <DateTime></DateTime>
        </div>
        {<img src={logo} className="logo" alt="logo" />}

      </div>
      <div>
        <p>Lat: {latitude}</p>
        <p>Lon: {longitude}</p>
        <p>City: {city}</p>
        <p>Temp now: {weatherData.length > 1 ? weatherData[0].temperature : 'Loading...'}</p>
        <p>Temp in 6 hours: {weatherData.length > 1 ? weatherData[6].temperature : 'Loading...'}</p>
        <p>Temp in 12 hours: {weatherData.length > 1 ? weatherData[12].temperature : 'Loading...'}</p>
        <p>Temp in 18 hours: {weatherData.length > 1 ? weatherData[18].temperature : 'Loading...'}</p>
        <p>Temp in 24 hours: {weatherData.length > 1 ? weatherData[24].temperature : 'Loading...'}</p>
        <p>Temp in 156 hours: {weatherData.length > 1 ? weatherData[155].temperature : 'Loading...'}</p>
        <p>Wind Speed now: {weatherData.length > 1 ? weatherData[0].windSpeed : 'Loading...'}</p>
        <p>Wind Speed in 6 hours: {weatherData.length > 1 ? weatherData[6].windSpeed : 'Loading...'}</p>
        <p>Wind Speed in 12 hours: {weatherData.length > 1 ? weatherData[12].windSpeed : 'Loading...'}</p>
        <p>Wind Speed in 18 hours: {weatherData.length > 1 ? weatherData[18].windSpeed : 'Loading...'}</p>
      </div>
    </div>

  );
}

export default App;
