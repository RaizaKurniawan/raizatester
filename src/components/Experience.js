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
          As a Lead Web3 QA Engineer, I am responsible for ensuring the quality and functionality of Web3 products manually and automatically. I make collaboration with various teams to make sure that blockchain transactions and Web3 features working seamlessly. In an Agile environment, I do the same thing with the team during Backlog Grooming and Sprint Planning to deliver high-quality products. 
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
    title: "Senior Quality Assurance",
    company: "Agate",
    description: (
      <>
        <p className="experience-paragraph">
        As a Senior Quality Assurance Engineer at Agate, I collaboration with other senior team members to establish standardized API testing practices. My role developing API test case scenarios based on response codes as expected outcomes, ensuring comprehensive coverage of functional and edge cases. Additionally, I contributed to security testing by implementing foundational SQL Injection tests and conducted API performance and stress testing to ensure system reliability under high load. Automation was a key focus, where we developed automated API tests using two specialized tools.
        </p>
        <ul className="task-list">
            {[
              "API Testing Standarization: Collaborated with senior colleagues to define and implement standardized API testing methodologies.",
              "Test Case Development: Designed and developed API test case scenarios with response codes as expected outcomes, ensuring accuracy and robustness.",
              "Security Testing: Conducted basic security testing, including SQL Injection tests, to identify vulnerabilities and strengthen API security.",  
              "Performance Testing: Performed API performance and stress tests to assess reliability and scalability under varying workloads.",
              "Automation Testing: Built and maintained automated API tests using two dedicated tools to enhance testing efficiency and consistency.",
            ].map((task, index) => (
              <li key={index}>
                <FaCheckCircle style={{ color: '#61dafb', marginRight: '10px' }} /> 
                {task}
              </li>
            ))}
          </ul>
      </>
    ),
    icon: <FaCode size={30} color="#61dafb" />,
  },
  {
    id: 3,
    title: "Associate Software QA",
    company: "BenihBaik",
    description: (
        <>
          <p className="experience-paragraph">
          As a QA Software Associate, I ensured the quality and reliability of both Android and iOS mobile applications, as well as desktop platforms, through a combination of manual and automation testing. I also conducted comprehensive payment testing to verify transaction workflows and ensure seamless user experiences.
          </p>
          <ul className="task-list">
            {[
              "Scenario and Test Case Development. Designed detailed scenarios and test cases to validate functionality, performance, and user requirements.",
              "Test Execution, Conducted various test types across platforms, including: Smoke Testing, Regression Testing, Full Testing, Bug Fixing Verification Testing, Mobile Application Testing (Android & iOS), and Payment system Testing.",
              "Automation Teting, Built and executed automation test scenarios using Cypress and Selenium IDE to improve test efficiency.",
              "Bug Reporting, Documented and reported bugs with detailed reproduction steps, ensuring effective communication with developers for resolution.",
            ].map((task, index) => (
              <li key={index}>
                <FaCheckCircle style={{ color: '#61dafb', marginRight: '10px' }} /> 
                {task}
              </li>
            ))}
          </ul>
        </>
    ),
    icon: <FaSeedling size={30} color="#61dafb" />
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
