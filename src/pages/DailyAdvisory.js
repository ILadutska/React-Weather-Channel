import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppProvider } from '../AppContext.js';
import logo from '../resources/logodesigns.png';
import background from '../resources/Daily_Advisory_new.jpg';
import sunny from '../resources/sunny.png';
import clear from '../resources/clear.png';
import mostly_clear from '../resources/mostly_clear.png';
import patchy_fog from '../resources/patchy_fog.png';
import chance_rain from '../resources/patchy_drizzle.jpg';
import mostly_sunny from '../resources/mostly_sunny.png';
import mostly_cloudy from '../resources/mostly_cloudy.jpg';
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
		dailyData,
		city,
		alertData,
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
				{selectedDay !== '' && dailyData.periods[selectedDay].shortForecast === "Sunny" ? (
						<img src={sunny} alt="Sunny" className="sunny" />
						) : (
						null
						)}

			{selectedDay !== '' && dailyData.periods[selectedDay].shortForecast === "Clear" ? (
				<img src={clear} alt="Clear" className="clear" />
				) : (
				null
			)}

			{selectedDay !== '' && dailyData.periods[selectedDay].shortForecast === "Mostly Clear" ? (
				<img src={mostly_clear} alt="Mostly Clear" className="mostly_clear" />
			) : (
				null
			)}

			

			{selectedDay !== '' && dailyData.periods[selectedDay].shortForecast === "Patchy Fog" ? (
				<img src={patchy_fog} alt="Patchy Fog" className="patchy_fog" />
			) : (
				null
			)}

			{selectedDay !== '' && dailyData.periods[selectedDay].shortForecast === "Chance Rain" ? (
				<img src={chance_rain} alt="Chance rain" className="chance_rain" />
			) : (
				null
			)}
			
			{selectedDay !== '' && dailyData.periods[selectedDay].shortForecast === "Mostly Sunny" ? (
				<img src={mostly_sunny} alt="Mostly Sunny" className="mostly_sunny" />
			) : (
				null
			)}

			{selectedDay !== '' && dailyData.periods[selectedDay].shortForecast === "Mostly Cloudy" ? (
				<img src={mostly_cloudy} alt="Mostly Cloudy" className="mostly_cloudy" />
			) : (
				null
			)}
			


			</div>
			
			<div>
				{dailyData && dailyData.periods && dailyData.periods.length > 1 ? (
					<div className="weather-info-container">
						<div className="weather-box">
							<p>Latitude: {latitude}</p>
						</div>
						<div className="weather-box">
							<p>Longitude: {longitude}</p>
						</div>
						<div className="city">
							<p>City: {city}</p>
						</div>
						{selectedDay !== '' ? (
							<>
								<div className="weather-box">
									<p>Day: {dailyData.periods[selectedDay].name}</p>
								</div>
								<div className="temperature">
									<p>Temperature: {dailyData.periods[selectedDay].temperature}°F</p>
								</div>
							

								
									<div className = "headline">
									<p>Alert: {alertData[0].headline}</p>
									</div>
								

								
									<div className = "description">
									<p>Expected Condition: {alertData[0].description}</p>
									</div>
								

								
									<div className = "instruction">
									<p>Safety Tips: {alertData[0].instruction}</p>
									</div>
							

								<div className="message">
									<p>As part of our commitment to keeping  </p>
									<p>you informed about weather conditions,</p>
									<p> we want to bring your attention to </p>
										<p>today's weather advisory.</p>
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
