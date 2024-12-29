import React from "react";
import { motion } from "framer-motion";
import { FaMobileAlt, FaShoppingCart, FaCogs, FaServer } from "react-icons/fa"; // Icons for projects

const qaProjects = [
  {
    id: 1,
    title: "Lets Flip",
    type: "QA Related",
    role: "Android and iOS app Tester",
    description: "Tested Android and iOS apps for functionality, usability, and performance to ensure quality standards.",
    icon: <FaMobileAlt size={35} color="#61dafb" />,
  },
  {
    id: 2,
    title: "Paron Indonesia",
    type: "QA Related",
    role: "e-Commerce QA Tester",
    description: "Performed extensive testing for an e-commerce platform, focusing on payment systems, product listings, and user experience.",
    icon: <FaShoppingCart size={35} color="#61dafb" />,
  },
];

const nonQaProjects = [
  {
    id: 1,
    title: "Integral Asia Pacific",
    type: "Non-related",
    role: "Implementer (KPI and DISC Personality Software)",
    description: "Implemented KPI and DISC Personality Software, contributing to organizational performance assessments.",
    icon: <FaCogs size={35} color="#61dafb" />,
  },
  {
    id: 2,
    title: "RS Mitra Kasih",
    type: "Non-related",
    role: "IT Staff (Jr. Database Administrator)",
    description: "Worked as a Junior Database Administrator, ensuring database integrity and supporting the IT department.",
    icon: <FaServer size={35} color="#61dafb" />,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">QA & Non-QA Projects</h2>
      <div className="projects-cards">
        {/* QA Related Projects */}
        <div className="qa-projects">
          <h3 className="project-category">QA Related Projects</h3>
          <div className="project-cards">
            {qaProjects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: project.id * 0.3 }}
              >
                <div className="project-icon">{project.icon}</div>
                <h4>{project.title}</h4>
                <h5>{project.role}</h5>
                <p>{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Non-QA Projects */}
        <div className="non-qa-projects">
          <h3 className="project-category">Non-QA Projects</h3>
          <div className="project-cards">
            {nonQaProjects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: project.id * 0.3 }}
              >
                <div className="project-icon">{project.icon}</div>
                <h4>{project.title}</h4>
                <h5>{project.role}</h5>
                <p>{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
