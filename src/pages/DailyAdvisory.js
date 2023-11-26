import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppProvider } from '../AppContext.js';
import logo from '../resources/logodesigns.png';
import background from '../resources/Daily_Advisory_new.jpg';
import sunny from '../resources/sunny.png';
import '../App.css';
import DateTime from '../DateTime.js';
import Navbar from '../components/Navbar-pages.js';
import NavbarDays from '../components/Navbar-days.js';

function DailyAdvisory() {

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

	const [selectedHour, setSelectedHour] = useState('');
	const [selectedDay, setSelectedDay] = useState('');




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
			{selectedDay !== '' && dailyData.periods[selectedDay].shortForecast === "Sunny" ? (
				console.log("the conditional worked"),
				<img src={sunny} alt="Sunny" className="sunny" />
			) : (
				null
			)}

			<div>
				{dailyData && dailyData.periods && dailyData.periods.length > 1 ? (
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
						{selectedDay !== '' ? (
							<>
								<div className="weather-box">
									<p>Day: {dailyData.periods[selectedDay].name}</p>
								</div>
								<div className="weather-box">
									<p>Temperature: {dailyData.periods[selectedDay].temperature}°F</p>
								</div>
								<div className="weather-box">
									<p>Event: {alertData.event}</p>
								</div>

								<div className="weather-box">
									<p>As part of our commitment to keeping you informed about weather conditions,</p>
									<p> we want to bring your attention to today's weather advisory.</p>
								</div>


							</>
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
			<DailyAdvisory />
		</AppProvider>
	);
}

export default AppWrapper;
