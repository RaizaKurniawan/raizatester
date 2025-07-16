import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCode, FaSeedling } from "react-icons/fa"; // Ikon
import { FaCheckCircle } from "react-icons/fa";

const experiences = [
  {
    id: 1,
    title: "Web3 Lead QA Engineer",
    company: "Confiction Labs.",
    description: (
      <>
        <p className="experience-paragraph">
          As a Leader, I am responsible for ensuring the quality and functionality of Web3 products manually and automatically. I make collaboration with various teams to make sure that blockchain transactions and Web3 features working seamlessly. In an Agile environment, I do the same thing with the team during Backlog Grooming and Sprint Planning to deliver high-quality products. 
        </p>
        <ul className="task-list">
          {[
            "Released 11 products, 3 products Web3 related, and contributed to gains 231.69 ETH equal to 650K in US Dollar",
            "Created and Designed a Test Plan, Scenario Test Cases, Bugs Tracking Report, and Post Mort-em", 
            "Performed manual and automatd testing: Smoke Test, Integration Test, API Test, Security Test, Performance Test, Stress Test, Load Test, UI Test, and Web3 Test",
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
         As a Senior Quality Assurance Engineer at Agate, I collaborated with senior team members to establish standardized API testing practices. I developed comprehensive API test case scenarios based on expected response codes, ensuring functional and edge case coverage. I contributed to basic security testing using DevTools and BurpSuite, and conducted performance and stress testing to validate system stability under high load. I automated API test flows using Postman, Playwright, MochaJS, Swagger, and Scalar. I also worked across platforms to ensure responsive and cross-device compatibility using iOS and Android emulators, BrowserStack, and LambdaTest. In addition, I tracked bugs using Notion, verified fixes, and led release and regression testing cycles.
        </p>
        <ul className="task-list">
            {[
              "API Testing Standardization: Collaborated with senior colleagues to define and implement standardized API testing methodologies in the company.",
              "Test Case Development: Designed and developed API test case scenarios with response codes as expected outcomes, ensuring accuracy and robustness.",
              "Security Testing: Performed basic security testing using DevTools and BurpSuite to identify vulnerabilities and strengthen API workflows.",
              "Performance Testing: Conducted API performance and stress tests using JMeter, Locust, and K6 to ensure system scalability.",
              "Automation Testing: Built and maintained automated API test flows using Postman, Playwright, MochaJS, Swagger, and Scalar.",
              "Cross-Device Testing: Ensured responsive and platform compatibility using iOS Simulator, Android Emulator, BrowserStack, and LambdaTest.",
              "Bug Tracking: Logged and managed issues in Notion with clear steps to reproduce, and collaborated with developers for timely resolution.",
              "Bug Verification & Release: Verified bug fixes, executed regression tests, and supported release testing in staging and production environments.",
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
    title: "Associate QA Software",
    company: "BenihBaik.com",
    description: (
        <>
          <p className="experience-paragraph">
          As a QA Software Associate, I ensured the quality and reliability of both Android and iOS mobile applications, as well as desktop platforms, through a combination of manual and automation testing. I also conducted comprehensive payment testing to verify transaction workflows and ensure seamless user experiences.
          </p>
          <ul className="task-list">
            {[
              "Reproduce the vulnerability using BurpSuite",
              "Scenario and Test Case Development. Designed detailed scenarios and test cases to validate functionality, performance, and user requirements.",
              "Test Execution, Conducted various test types across platforms, including: Smoke Testing, Regression Testing, Full Testing, Bug Fixing Verification Testing, Mobile Application Testing (Android & iOS), and Payment system Testing.",
              "Automation Testing, Built and executed automation test scenarios using Cypress and Selenium IDE to improve test efficiency.",
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
      <h2 className="experience-title">Experience</h2>
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
