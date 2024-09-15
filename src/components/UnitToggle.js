import React from 'react';
import { motion } from 'framer-motion';

const UnitToggle = ({ isCelsius, handleUnitToggle }) => {
  return (
    <motion.div className="unit-toggle">
      <motion.button
        onClick={handleUnitToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
      </motion.button>
    </motion.div>
  );
};

export default UnitToggle;
