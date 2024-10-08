import React, { useState } from 'react';
import './xWeather.css'; // Note the change from module.css to regular CSS import
import axios from 'axios';

const WeatherCard = ({ title, data }) => {
    return (
        <div className="weather-card">
            <h3>{title}</h3>
            <p>{data}</p>
        </div>
    );
};

function Weather() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSearch() {
        if (city) {
            setLoading(true);
            axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}`)
            .then((response) => {
                setWeatherData(response.data);
            })
            .catch((err) => {
                console.error("Error fetching data: ", err);
                alert("Failed to fetch weather data");
            })
            .finally(() => setLoading(false));
        } else {
            alert("Please enter a city name");
        }
    }

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Enter city name'
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="weather-display">
                {loading && <p>Loading data...</p>}
                {!loading && weatherData && (
                    <div className="weather-cards">
                        <WeatherCard
                            title="Temperature"
                            data={`${weatherData.current.temp_c}°C`}
                        />
                        <WeatherCard
                            title="Humidity"
                            data={`${weatherData.current.humidity}%`}
                        />
                        <WeatherCard
                            title="Condition"
                            data={weatherData.current.condition.text}
                        />
                        <WeatherCard
                            title="Wind Speed"
                            data={`${weatherData.current.wind_kph} kph`}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default Weather;
