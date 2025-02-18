// Contact.js
import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaFilePdf } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Contact Me</h2>
      <p className="contact-subtitle">I'm always open to collaborating on exciting projects or just having a chat!</p>
      <div className="contact-links">
        <motion.a
          href="mailto:raizakurniawan@gmail.com"
          className="contact-link"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaEnvelope className="contact-icon" /> Email Me
        </motion.a>
        <motion.a 
          href="/assets/RaizaKurniawan_Resume2025.pdf"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaFilePdf className="contact-icon" /> Download Resume
        </motion.a>
        <motion.a 
          href="/assets/RaizaKurniawan_CV2025.pdf"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaFilePdf className="contact-icon" /> Download CV
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/raiza-kurniawan"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLinkedin className="contact-icon" /> LinkedIn
        </motion.a>
        <motion.a
          href="https://github.com/RaizaKurniawan"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub className="contact-icon" /> GitHub
        </motion.a>
      </div>
    </section>
  );
};

export default Contact;
