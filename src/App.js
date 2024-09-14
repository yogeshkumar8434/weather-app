import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; 
import './App.css';

const API_KEY = 'a0e19756e45cc9f67d75d7bff1fa654b'; 

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');

    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecastData(forecastResponse.data);
    } catch (err) {
      setError('City not found, please try again.');
    }

    setLoading(false);
  };

  const handleSearch = () => {
    if (city.trim() === '') {
      setError('Please enter a valid city name.');
    } else {
      fetchWeatherData();
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, type: 'spring', stiffness: 70 } },
  };

  return (
    <motion.div 
      className="app-container"
      initial={{ opacity: 0 }}  
      animate={{ opacity: 1 }}  
      transition={{ duration: 0.8 }}  
    >
      <motion.h1 
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        Weather Forecast
      </motion.h1>

      <motion.div 
        className="search-container"
        initial={{ y: -100 }}  
        animate={{ y: 0 }}  
        transition={{ type: 'spring', stiffness: 50 }}  
      >
        <motion.input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          whileFocus={{ scale: 1.05,}}  
          transition={{ duration: 0.3 }}
        />
        <motion.button
          onClick={handleSearch}
          whileHover={{ scale: 1.1, backgroundColor: '#ff5722', color: '#fff' }} 
          whileTap={{ scale: 0.95 }}  
          transition={{ duration: 0.3 }}
        >
          Search
        </motion.button>
      </motion.div>

      {loading && <motion.p className="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}><img src='/loading.svg' alt='loading' height={200} width={200} /> </motion.p>}
      {error && <motion.p className="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{error}</motion.p>}

     
      {weatherData && (
        <motion.div 
          className="weather-info"
          initial={{ opacity: 0, y: 20 }}  
          animate={{ opacity: 1, y: 0 }}  
          transition={{ duration: 0.5 }}
        >
          <motion.h2 variants={textVariants} initial="initial" animate="animate">
            Current Weather in {weatherData.name}
          </motion.h2>
          <motion.p variants={textVariants} initial="initial" animate="animate">
            Temperature: {weatherData.main.temp} °C
          </motion.p>
          <motion.p variants={textVariants} initial="initial" animate="animate">
            Weather: {weatherData.weather[0].description}
          </motion.p>
          <motion.p variants={textVariants} initial="initial" animate="animate">
            Humidity: {weatherData.main.humidity}%
          </motion.p>
          <motion.p variants={textVariants} initial="initial" animate="animate">
            Wind Speed: {weatherData.wind.speed} m/s
          </motion.p>
        </motion.div>
      )}

      
      {forecastData && (
        <motion.div 
          className="forecast-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}  
        >
          <motion.h2 variants={textVariants} initial="initial" animate="animate">
            5-Day Forecast
          </motion.h2>
          <motion.div 
            className="forecast-grid"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
            }}
          >
            {forecastData.list.slice(0, 5).map((forecast, index) => (
              <motion.div 
                key={index} 
                className="forecast-item"
                whileHover={{ scale: 1.05, rotate: 5 }}  
                transition={{ duration: 0.3 }}
              >
                <p>{new Date(forecast.dt_txt).toLocaleDateString()}</p>
                <p>Temp: {forecast.main.temp} °C</p>
                <p>{forecast.weather[0].description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default App;
