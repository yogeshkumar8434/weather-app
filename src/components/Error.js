import React from 'react';
import { motion } from 'framer-motion';

const Error = ({ error }) => {
  return (
    <motion.p className="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {error}
    </motion.p>
  );
};

export default Error;
