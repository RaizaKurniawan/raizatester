import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAward, FaDatabase, FaTrophy } from "react-icons/fa"; // Icons for achievements
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaDownload } from "react-icons/fa";

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

// Array of slide paths (15 slides)
const performanceSlides = Array.from({ length: 16 }, (_, index) => `/assets/performance-slides/performance-slide${index + 1}.png`);

const Achievements = () => {

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

      {/* Button to open the modal */}
      <div className="performance-rev-button-container">
          <button onClick={openModal} className="performance-rev-button">
            View Performance Review 2024
          </button>
      </div>

        {/* Modal for Performance Review */}
        {isModalOpen && (
          <AnimatePresence>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal} // Close modal when clicking the overlay
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={closeModal} className="modal-close-button">
                  &times;
                </button>
                <h2 className="modal-title">Performance Review 2024</h2>
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop={true}
                  className="modal-swiper"
                  lazy={true}
                >
                  {performanceSlides.map((slide, index) => {
                    const altText = `Performance Review Slide ${index + 1}`;
                    return (
                      <SwiperSlide key={index}>
                        <img
                          src={slide}
                          alt={altText}
                          className="modal-slide swiper-lazy"
                          loading="lazy"
                        />
                        <div className="swiper-lazy-preloader"></div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <a href="/performance-review-2024.pdf" download className="download-link">
                  Download Performance Review PDF <FaDownload style={{ marginLeft: "8px" }} />
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
    </section>
  );
};

export default Achievements;
