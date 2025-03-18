import React from 'react';
import { motion } from 'framer-motion';

const AnimatedParticles = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0"
    >
      {Array.from({ length: 20 }).map((_, index) => {
        // Create a fixed seed for each particle instead of random values
        const leftPos = `${(index * 5) % 100}%`;
        const topPos = `${(index * 7) % 100}%`;
        
        return (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-indigo-500"
            style={{
              left: leftPos,
              top: topPos,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + (index % 5) * 2,
              repeat: Infinity,
              delay: index % 5,
            }}
          />
        );
      })}
    </motion.div>
  );
};

export default AnimatedParticles;