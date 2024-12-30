import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaDatabase, FaTrophy } from "react-icons/fa"; // Icons for achievements

const achievements = [
  {
    id: 1,
    title: "Database Destruction Discovery",
    year: "2010",
    description: "Uncovered a hospital's database destruction via network scanning (RS Mitra Kasih, Cimahi).",
    icon: <FaDatabase size={40} color="#61dafb" />,
  },
  {
    id: 2,
    title: "The Best Employee (3 times)",
    year: "2019",
    description: "Awarded 'The Best Employee' 3 times consecutively in one year (Integral).",
    icon: <FaTrophy size={40} color="#61dafb" />,
  },
  {
    id: 3,
    title: "The Best Employee Performance",
    year: "2022",
    description: "Awarded 'The Best Employee Performance' (Agate).",
    icon: <FaAward size={40} color="#61dafb" />,
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="achievements-section">
      <h2 className="achievements-title">Achievements</h2>
      <div className="achievements-cards">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className="achievement-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: achievement.id * 0.3 }}
          >
            <div className="achievement-icon">{achievement.icon}</div>
            <h3>{achievement.title}</h3>
            <h4>{achievement.year}</h4>
            <p>{achievement.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
