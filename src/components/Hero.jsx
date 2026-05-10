import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from 'react-icons/fa';

const ROLES = [
  "QA Engineer",
  "Test Automation Engineer",
  "Web3 QA Lead",
  "API Testing Specialist",
];

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  delay: `${((i * 0.73) % 7).toFixed(2)}s`,
  x: `${((i * 17 + 3) % 98) + 1}%`,
}));

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 55 : 95;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === current) {
        setTimeout(() => setIsDeleting(true), 1800);
        return;
      }
      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        return;
      }
      setDisplayText(
        isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-particles">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{ '--delay': p.delay, '--x': p.x }}
          />
        ))}
      </div>

      <div className="hero-content">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Raiza Kurniawan
        </motion.h1>

        <motion.div
          className="hero-role-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <span className="hero-role-text">{displayText}</span>
          <span className="hero-cursor">|</span>
        </motion.div>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
        >
          Dedicated to building high-quality, scalable applications.
        </motion.p>

        <motion.a
          href="#about"
          className="cta-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 36px rgba(0,212,255,0.55)" }}
          whileTap={{ scale: 0.97 }}
        >
          Scroll Down <FaArrowDown size={15} />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
