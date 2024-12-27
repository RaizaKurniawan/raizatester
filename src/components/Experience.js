import React from "react";
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    { role: "QA Engineer", company: "Tech Company A", years: "2022 - Present" },
    { role: "Intern QA", company: "Startup B", years: "2021 - 2022" },
  ];

  return (
    <section id="experience">
      <h2>Experience</h2>
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <h3>{exp.role}</h3>
          <p>{exp.company}</p>
          <p>{exp.years}</p>
        </motion.div>
      ))}
    </section>
  );
};

export default Experience;
