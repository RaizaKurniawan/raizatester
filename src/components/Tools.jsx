import React from "react";
import { motion } from "framer-motion";


const tools = [
  {
    id: 1,
    name: "Selenium IDE",
    description: "Automation testing for web applications.",
    icon: "/assets/selenium-logo.png", // Masukkan path logo tools
  },
  {
    id: 2,
    name: "Postman",
    description: "API testing and collaboration tool.",
    icon: "/assets/postman-logo.png",
  },
  {
    id: 3,
    name: "JMeter",
    description: "Performance and load testing tool.",
    icon: "/assets/jmeter-logo.png",
  },
  {
    id: 4,
    name: "MochaJS",
    description: "API automation testing",
    icon: "/assets/mochajs-logo.png",
  },
  {
    id: 5,
    name: "Cypress",
    description: "End to End testing",
    icon: "/assets/cypress-logo.png",
  },
  {
    id: 6,
    name: "Burp Suite",
    description: "Basic Security Test",
    icon: "/assets/burpsuite-logo.png",
  },
];

const Tools = () => {
  return (
    <section id="tools" className="tools-section">
      <h2 className="tools-title">Tools I Use</h2>
      <div className="tools-grid">
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            className="tool-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={tool.icon} alt={tool.name} className="tool-icon" />
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// const Tools = () => {
//     return (
//       <section className="tools-section">
//         {/* Judul section khusus */}
//         <h2 className="tools-title">Tools I Use</h2>
  
//         {/* Grid untuk card tools */}
//         <div className="tools-grid">
//           <div className="tool-card">Tool 1</div>
//           <div className="tool-card">Tool 2</div>
//           <div className="tool-card">Tool 3</div>
//           <div className="tool-card">Tool 4</div>
//           <div className="tool-card">Tool 5</div>
//           <div className="tool-card">Tool 6</div>
//         </div>
//       </section>
//     );
//   };
export default Tools;
