import React from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from 'react-icons/fa';  // Ikon panah untuk CTA

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Hi, I'm Raiza Kurniawan
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          A passionate QA Engineer dedicated to building high-quality, scalable applications.
        </motion.p>
        <motion.a
          href="#about"
          className="cta-button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <FaArrowDown size={30} /> Scroll Down
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
