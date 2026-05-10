import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAward, FaDatabase, FaTrophy, FaDownload } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const achievements = [
  {
    id: 1,
    title: "Database Destruction Discovery",
    year: "2010",
    description: "Uncovered a hospital's database destruction via network scanning (RS Mitra Kasih, Cimahi).",
    icon: <FaDatabase size={38} color="#00d4ff" />,
  },
  {
    id: 2,
    title: "The Best Employee (3 times)",
    year: "2019",
    description: "Awarded 'The Best Employee' 3 times consecutively in one year (Integral).",
    icon: <FaTrophy size={38} color="#00d4ff" />,
  },
  {
    id: 3,
    title: "The Best Employee Performance",
    year: "2022",
    description: "Awarded 'The Best Employee Performance' (Agate).",
    icon: <FaAward size={38} color="#00d4ff" />,
  },
];

const performanceSlides = Array.from(
  { length: 16 },
  (_, i) => `/assets/performance-slides/performance-slide${i + 1}.png`
);

const Achievements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="achievements" className="achievements-section">
      <span className="achievements-eyebrow">Recognition</span>
      <h2 className="achievements-title">Achievements</h2>

      <div className="achievements-cards">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement.id}
            className="achievement-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.15 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="achievement-icon">{achievement.icon}</div>
            <h3>{achievement.title}</h3>
            <h4>{achievement.year}</h4>
            <p>{achievement.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="performance-rev-button-container">
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="performance-rev-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          View Performance Review 2024
        </motion.button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.82, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-close-button"
              >
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
                {performanceSlides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={slide}
                      alt={`Performance Review Slide ${index + 1}`}
                      className="modal-slide swiper-lazy"
                      loading="lazy"
                    />
                    <div className="swiper-lazy-preloader" />
                  </SwiperSlide>
                ))}
              </Swiper>

              <a
                href="/performance-review-2024.pdf"
                download
                className="download-link"
              >
                Download Performance Review PDF
                <FaDownload style={{ marginLeft: "8px" }} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
