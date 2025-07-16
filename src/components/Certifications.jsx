import React from "react";
import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";
import './Certifications.css'; // Import the CSS file

const Certifications = () => {
  const certificationList = [
    {
      id: 1,
      name: "Cypress Certificate",
      issuer: "Udemy",
      date: "February 2025",
      description: "Cypress: Web Automation Testing from Zero to Hero.",
      link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-df403fb7-082a-4d7f-b883-41281b42fd96.pdf",
    },
  ];

  return (
    <section id="certifications" className="certifications-section">
      <h2 className="certifications-title">Certifications</h2>
      <div className="certifications-container">
        {certificationList.map((cert) => (
          <motion.div
            key={cert.id}
            className="certification-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="certification-name">{cert.name}</h3>
            <p className="certification-issuer">{cert.issuer}</p>
            <p className="certification-date">{cert.date}</p>
            <p className="certification-description">{cert.description}</p>
            {cert.link && (
              <motion.a
                href={cert.link}
                className="certification-link"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCertificate className="certification-icon" /> View Certificate
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;