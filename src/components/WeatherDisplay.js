import React from 'react';
import { motion } from 'framer-motion';

const WeatherDisplay = ({ weatherData, isCelsius }) => {
  return (
    <motion.div className="weather-info">
      <motion.h2>Current Weather in {weatherData?.name}</motion.h2>
      <motion.p>Temperature: {weatherData?.main?.temp} {isCelsius ? '°C' : '°F'}</motion.p>
      <motion.p>Weather: {weatherData?.weather[0].description}</motion.p>
      <motion.p>Humidity: {weatherData?.main?.humidity}%</motion.p>
      <motion.p>Wind Speed: {weatherData?.wind?.speed} m/s</motion.p>
    </motion.div>
  );
};

export default WeatherDisplay;
