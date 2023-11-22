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
	const [dailyData, setDailyData] = useState({});
	const [alertData, setAlertData] = useState({});

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
			.then((data) =>{
				const fetchHourly = fetch(data.properties.forecastHourly)
				.then((hourlyData) => {
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
					return hourlyData.properties;
				});

				const fetchDaily = fetch(data.properties.forecast)
				.then((dailyData) => {
					if (data && data.properties && data.properties.forecast) {
						return fetch(data.properties.forecast);
					} else {
						throw new Error('No daily forecast available');
					}
				})
				.then((res) => res.json())
				.then((dailyData) => {
					setDailyData(dailyData.properties);
					console.log(dailyData.properties); // Log fetched hourly data
					return dailyData.properties;
				});
				const fetchAlerts = fetch(`https://api.weather.gov/alerts/active?point=${latitude},${longitude}`)
					.then((res) => res.json())
					.then((data) => {
						setAlertData(data);
						return data.features;
					}).then((features) => {
						if (features.length > 0) {
							const alertPropertiesList = features.map((feature) => feature.properties);
							return alertPropertiesList;
						} else {
							throw new Error('No alerts available');
						}
					})
					.then((alertPropertiesList) => {
						setAlertData(alertPropertiesList);
						console.log(alertPropertiesList); // Log fetched hourly data
						return alertPropertiesList;
					})
					.catch((error) => {
						console.error('Error: ', error.message);
					});
				return Promise.all([fetchHourly, fetchDaily, fetchAlerts]);
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
		dailyData,
		alertData,
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
		setDailyData,
		setAlertData,
	};

	return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
};
