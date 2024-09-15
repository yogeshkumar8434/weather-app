import React from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ city, setCity, handleSearch, fetchWeatherByLocation }) => {
  return (
    <motion.div className="search-container">
      <motion.input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        whileFocus={{ scale: 1.05 }}
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
      <motion.button
        onClick={fetchWeatherByLocation}
        whileHover={{ scale: 1.1, backgroundColor: '#4caf50', color: '#fff' }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        Use My Location
      </motion.button>
    </motion.div>
  );
};

export default SearchBar;
