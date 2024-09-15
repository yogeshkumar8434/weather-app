import React from 'react';
import { motion } from 'framer-motion';

const ForecastDisplay = ({ forecastData, isCelsius }) => {
  return (
    <motion.div className="forecast-info">
      <motion.h2>5-Day Forecast</motion.h2>
      <motion.div className="forecast-grid">
        {forecastData.list.slice(0, 5).map((forecast, index) => (
          <motion.div key={index} className="forecast-item">
            <p>{new Date(forecast?.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {forecast?.main.temp} {isCelsius ? '°C' : '°F'}</p>
            <p>{forecast?.weather[0].description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ForecastDisplay;
