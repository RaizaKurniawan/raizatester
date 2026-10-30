import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAward, FaDatabase, FaTrophy, FaDownload, FaChartLine, FaExternalLinkAlt, FaCertificate } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Newest first, matching how the Experience timeline reads.
const achievements = [
  {
    id: "perf-2024",
    title: "Performance Review 2024",
    year: "2024",
    org: "Agate",
    description: "Full-year performance review across 16 slides, covering delivery, quality ownership and collaboration.",
    icon: <FaChartLine size={34} color="#00d4ff" />,
    opensReview: true,
  },
  {
    id: "best-perf-2022",
    title: "The Best Employee Performance",
    year: "2022",
    org: "Agate",
    description: "Awarded 'The Best Employee Performance'.",
    icon: <FaAward size={34} color="#00d4ff" />,
  },
  {
    id: "best-emp-2019",
    title: "The Best Employee (3 times)",
    year: "2019",
    org: "Integral",
    description: "Awarded 'The Best Employee' three times consecutively in one year.",
    icon: <FaTrophy size={34} color="#00d4ff" />,
  },
  {
    id: "db-2010",
    title: "Database Destruction Discovery",
    year: "2010",
    org: "RS Mitra Kasih, Cimahi",
    description: "Uncovered a hospital's database destruction through network scanning.",
    icon: <FaDatabase size={34} color="#00d4ff" />,
  },
];

const certifications = [
  {
    id: "cypress-2025",
    name: "Cypress Certificate",
    issuer: "Udemy",
    date: "February 2025",
    description: "Cypress: Web Automation Testing from Zero to Hero.",
    link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-df403fb7-082a-4d7f-b883-41281b42fd96.pdf",
  },
];

const performanceSlides = Array.from(
  { length: 16 },
  (_, i) => `/assets/performance-slides/performance-slide${i + 1}.png`
);

const REVIEW_PDF = "/assets/Raiza2024-PerformanceReviews.pdf";

const TABS = [
  { key: "achievements", label: "Achievements", count: achievements.length },
  { key: "certifications", label: "Certifications", count: certifications.length },
];

const Recognition = () => {
  const [tab, setTab] = useState("achievements");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeRef = useRef(null);
  const openerRef = useRef(null);

  // Close on Escape, hold focus inside the dialog while it is open, and lock
  // background scrolling. Focus returns to whatever opened it.
  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = closeRef.current
        ?.closest(".modal-content")
        ?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      openerRef.current?.focus();
    };
  }, [isModalOpen]);

  const openReview = (e) => {
    openerRef.current = e.currentTarget;
    setIsModalOpen(true);
  };

  const shown = tab === "achievements" ? achievements : certifications;

  return (
    // Both former section ids live here so existing links and the header nav
    // keep working after the merge.
    <section id="achievements" className="recognition-section">
      <span id="certifications" className="recognition-anchor" aria-hidden="true" />
      <span className="recognition-eyebrow">Recognition</span>
      <h2 className="recognition-title">Achievements</h2>
      <p className="recognition-subtitle">
        Awards earned on the job, and the certifications behind the testing practice.
      </p>

      <div className="recognition-tabs" role="group" aria-label="Switch between achievements and certifications">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            className="recognition-tab"
            aria-pressed={tab === item.key}
            onClick={() => setTab(item.key)}
          >
            {item.label}
            <span className="recognition-tab-count">{item.count}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="recognition-grid">
        <AnimatePresence mode="popLayout">
          {tab === "achievements" && shown.map((item, i) => {
            const Card = item.opensReview ? motion.button : motion.article;
            return (
              <Card
                key={item.id}
                layout
                {...(item.opensReview
                  ? { type: "button", onClick: openReview, className: "recognition-card is-interactive" }
                  : { className: "recognition-card" })}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: Math.min(i, 3) * 0.07 }}
              >
                <span className="recognition-year">{item.year}</span>
                <div className="recognition-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <span className="recognition-org">{item.org}</span>
                <p>{item.description}</p>
                {item.opensReview && (
                  <span className="recognition-cue">View 16 slides</span>
                )}
              </Card>
            );
          })}

          {tab === "certifications" && shown.map((cert, i) => (
            <motion.article
              key={cert.id}
              layout
              className="recognition-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: Math.min(i, 3) * 0.07 }}
            >
              <span className="recognition-year">{cert.date}</span>
              <div className="recognition-icon"><FaCertificate size={34} color="#00d4ff" /></div>
              <h3>{cert.name}</h3>
              <span className="recognition-org">{cert.issuer}</span>
              <p>{cert.description}</p>
              {cert.link && (
                <a
                  href={cert.link}
                  className="recognition-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View certificate <FaExternalLinkAlt size={11} aria-hidden="true" />
                </a>
              )}
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Certifications are deliberately few, so point at the verifiable work
          instead of padding the list. */}
      {tab === "certifications" && (
        <motion.p
          className="recognition-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          Most of what I know came from shipping, not exams. For evidence of depth,
          the <a href="/experience">experience page</a> breaks down the pipelines,
          suites and bugs behind each role.
        </motion.p>
      )}

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
              role="dialog"
              aria-modal="true"
              aria-label="Performance Review 2024"
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.82, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                onClick={() => setIsModalOpen(false)}
                className="modal-close-button"
                aria-label="Close performance review"
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
              >
                {performanceSlides.map((slide, index) => (
                  <SwiperSlide key={slide}>
                    <img
                      src={slide}
                      alt={`Performance review slide ${index + 1} of ${performanceSlides.length}`}
                      className="modal-slide"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <a href={REVIEW_PDF} download className="download-link">
                Download Performance Review PDF
                <FaDownload style={{ marginLeft: "8px" }} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Recognition;
