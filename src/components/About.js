import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaLaptopCode } from "react-icons/fa";  // Ikon untuk bagian About Me

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <div className="about-left">
          <motion.h2
            className="about-title"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="about-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Hi! I'm Raiza Kurniawan, a passionate QA Engineer dedicated to building high-quality, scalable applications. With a background in software testing and automation, I focus on ensuring that applications run smoothly and meet user expectations.
          </motion.p>

          <div className="about-icons">
            <div className="icon">
              <FaUser size={30} />
              <p>QA Engineer</p>
            </div>
            <div className="icon">
              <FaBriefcase size={30} />
              <p>Experience</p>
            </div>
            <div className="icon">
              <FaLaptopCode size={30} />
              <p>Automation</p>
            </div>
          </div>
        </div>
        <div className="about-right">
          <motion.img
            src="/assets/raizakurniawan.jpg" // Ganti dengan path gambar Anda
            alt="Raiza Kurniawan"
            className="about-photo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
