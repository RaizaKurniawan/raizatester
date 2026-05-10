import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaLaptopCode, FaEthereum } from "react-icons/fa";

const useCounter = (target, duration = 2000, active = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
};

const stats = [
  { icon: <FaBriefcase size={22} />, value: 5,   suffix: "+",   label: "Years Exp."  },
  { icon: <FaLaptopCode size={22} />, value: 11,  suffix: "",    label: "Products"    },
  { icon: <FaUser size={22} />,       value: 3,   suffix: "",    label: "Companies"   },
  { icon: <FaEthereum size={22} />,   value: 231, suffix: " ETH",label: "Contributed" },
];

const StatCard = ({ stat, index, active }) => {
  const count = useCounter(stat.value, 2000, active);
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
    >
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-value">{count}{stat.suffix}</div>
      <div className="stat-label">{stat.label}</div>
    </motion.div>
  );
};

const About = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-content">
        <div className="about-left">
          <motion.span
            className="section-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get to know me
          </motion.span>

          <motion.h2
            className="about-title"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            About Me
          </motion.h2>

          <motion.p
            className="about-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Hi! I'm Raiza Kurniawan, a passionate QA Engineer dedicated to building
            high-quality, scalable applications. With 5 years of experience in
            software testing and automation, I focus on ensuring that applications
            run smoothly, meet user expectations and contributed to gains 231.69 ETH
            equal to US$650,000 in blockchain projects.
          </motion.p>

          <div className="about-stats">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} active={inView} />
            ))}
          </div>
        </div>

        <div className="about-right">
          <motion.div
            className="photo-frame"
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="photo-glow" />
            <img
              src="/assets/raizakurniawan.jpg"
              alt="Raiza Kurniawan"
              className="about-photo"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
