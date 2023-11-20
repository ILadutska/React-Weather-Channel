import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);
	const [userLatitude, setUserLatitude] = useState('');
	const [userLongitude, setUserLongitude] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [city, setCity] = useState('');
	const [userInput, setUserInput] = useState('');
	const [options, setOptions] = useState([]);
	const [weatherData, setWeatherData] = useState({});
	const [hourlyData, setHourlyData] = useState({});

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
		fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value},,US&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
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

	const contextValues = {
		isInitialFetchDone,
		userLatitude,
		userLongitude,
		latitude,
		longitude,
		city,
		userInput,
		options,
		weatherData,
		hourlyData,
		setIsInitialFetchDone,
		setUserLatitude,
		setUserLongitude,
		setLatitude,
		setLongitude,
		setCity,
		setUserInput,
		setOptions,
		setWeatherData,
		setHourlyData,
		getSearchOption,
		onInputChange,
		onOptionSelect,
		fetchWeatherData,
	};

	return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
};
