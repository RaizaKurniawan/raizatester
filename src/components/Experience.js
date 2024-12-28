import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCode, FaSeedling } from "react-icons/fa"; // Ikon
import { FaCheckCircle } from "react-icons/fa";

const experiences = [
  {
    id: 1,
    title: "Lead Web3 QA Engineer",
    company: "Confiction Labs.",
    description: (
      <>
        <p className="experience-paragraph">
          As a Lead Web3 QA Engineer, I was responsible for ensuring the quality and functionality of Web3 products. My role included both manual and automated testing, and I collaborated closely with various teams to make sure that blockchain transactions and Web3 features were working seamlessly.
        </p>
        <ul className="task-list">
          {[
            "Created Test Plan", 
            "Created and developed Test Scenarios transitioning from manual to automation", 
            "Performed manual and automated testing: Smoke Test, Integration Test, API Test, Security Test, Performance Test, Stress Test, Load Test, UI Test, and Web3 Test",
            "Collaborated with Tech Lead, PM, and Chief Product Officer to produce robust, secure, and functional Web3 products",
            "Ensured Blockchain transactions functioned correctly (Deposit, Staking, Withdrawal, AirDrop, Quest, and Auction)",
            "Managed the QA team and assigned product Web3 Supervisors for each product",
          ].map((task, index) => (
            <li key={index}>
              <FaCheckCircle style={{ color: '#61dafb', marginRight: '10px' }} /> 
              {task}</li>
          ))}
        </ul>
      </>
    ),
    icon: <FaBriefcase size={30} color="#61dafb" />,
  },
  {
    id: 2,
    title: "Associate Software QA",
    company: "BenihBaik",
    description: (
        <>
          <p className="experience-paragraph">
            Collaborated with developers to identify and resolve software bugs, enhancing system reliability. Conducted testing in crowdfunding and payment systems.
          </p>
        </>
    ),
    icon: <FaSeedling size={30} color="#61dafb" />
  },
  {
    id: 3,
    title: "Senior Quality Assurance",
    company: "Agate",
    description: "",
    icon: <FaCode size={30} color="#61dafb" />,
  },
];

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title">Experience</h2>
      <div className="experience-cards">
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            className="experience-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="experience-icon">{exp.icon}</div>
            <h3>{exp.title}</h3>
            <h4>{exp.company}</h4>
            <div>{exp.description}</div> {/* Menampilkan deskripsi */}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
