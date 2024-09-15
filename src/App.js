import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import UnitToggle from './components/UnitToggle';
import Error from './components/Error';
import { toastMessages } from './helper/toast_messages';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_BASE_URL = process.env.REACT_APP_BASE_URL; 

function App() {
  const [city, setCity] = useState(localStorage.getItem('lastCity') || '');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    if (city) fetchWeatherData();
  }, [unit]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');

    try {
      const weatherResponse = await axios.get(
        `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      setForecastData(forecastResponse.data);

      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError(toastMessages?.CITY_NOT_FOUND);
    }

    setLoading(false);
  };

  const handleUnitToggle = () => {
    setIsCelsius(!isCelsius);
    setUnit(isCelsius ? 'imperial' : 'metric');
  };

  const fetchWeatherByLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        setLoading(true);
        try {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`
          );
          setWeatherData(weatherResponse.data);

          const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`
          );
          setForecastData(forecastResponse.data);

          setCity(weatherResponse.data.name);
          localStorage.setItem('lastCity', weatherResponse.data.name);
        } catch (err) {
          setError('Unable to fetch weather data for your location.');
        }
        setLoading(false);
      });
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };
console.log('BASE_URL',API_BASE_URL)
  return (
    <motion.div className="app-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <motion.h1>Weather Forecast</motion.h1>

      <SearchBar city={city} setCity={setCity} handleSearch={fetchWeatherData} fetchWeatherByLocation={fetchWeatherByLocation} />

      <UnitToggle isCelsius={isCelsius} handleUnitToggle={handleUnitToggle} />

      {loading && <motion.p className="loading">  <img src='/loading.svg' alt='loading' height={200} width={200} /></motion.p>}

      {error && <Error error={error} />}

      {!loading && weatherData && (
        <WeatherDisplay weatherData={weatherData} isCelsius={isCelsius} />
      )}

      {!loading && forecastData && (
        <ForecastDisplay forecastData={forecastData} isCelsius={isCelsius} />
      )}
    </motion.div>
  );
}

export default App;
