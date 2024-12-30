import React, { useEffect, useRef} from "react";
import { motion } from "framer-motion";
import { FaMobileAlt, FaShoppingCart, FaCogs, FaServer, FaFileInvoiceDollar, FaBroadcastTower } from "react-icons/fa";

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
  {
    id: 3,
    title: "USSI Prima Software",
    type: "Non-related",
    role: "Implementer (Financial Industry)",
    description: "Worked as an Implementer, I responsible for deploying software to various branch offices, configuring client-server settings, and ensuring the software is connected to the central database. I also ensure that each branch has access to real-time financial data, guaranteeing seamless integration and data flow across all locations.",
    icon: <FaFileInvoiceDollar size={35} color="#61dafb" />,
    
  },
  {
    id: 4,
    title: "BTS Provider Bahana",
    type: "Non-related",
    role: "IT Support (Telecommunication)",
    description: "As an IT Support, I handled the installation of operating systems (Windows, Linux (Ubuntu Server, Fedora)) and perform network troubleshooting. I also provide IT support across departments to ensure that all technological needs are met, ensuring smooth operations for the entire organization.",
    icon: <FaBroadcastTower size={35} color="#61dafb" />,
    
  },
];

const Projects = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    // Duplicate child nodes for looping effect
    const firstClone = carousel.innerHTML;
    carousel.innerHTML += firstClone;

    let scrollAmount = 0;
    const scrollSpeed = 0.5; // Adjust speed (px/frame)
    const maxScroll = carousel.scrollWidth / 2; // Limit scrolling to the first half

    function autoScroll() {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0; // Reset scroll
      }
      carousel.scrollLeft = scrollAmount;
      requestAnimationFrame(autoScroll);
    }

    autoScroll();

    return () => {
      // Cleanup animation frame if component unmounts
      cancelAnimationFrame(autoScroll);
    };
  }, []);

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Another Projects</h2>
      <div className="carousel-container" ref={carouselRef}>
        {/* QA Projects */}
        {qaProjects.map((project) => (
          <motion.div
            key={`qa-${project.id}`}
            className="carousel-card"
            style={{
              background: project.backgroundImage
                ? `url(${project.backgroundImage})`
                : "linear-gradient(135deg, #242424, #444444)", // Gradien gelap
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white", // Pastikan teks tetap terlihat
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="project-icon">{project.icon}</div>
            <h4>{project.title}</h4>
            <h5>{project.role}</h5>
            <p>{project.description}</p>
          </motion.div>
        ))}
  
        {/* Non-QA Projects */}
        {nonQaProjects.map((project) => (
          <motion.div
            key={`nonqa-${project.id}`}
            className="carousel-card"
            style={{
              background: project.backgroundImage
                ? `url(${project.backgroundImage})`
                : "linear-gradient(135deg, #242424, #444444)", // Gradien gelap
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white", // Pastikan teks tetap terlihat
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="project-icon">{project.icon}</div>
            <h4>{project.title}</h4>
            <h5>{project.role}</h5>
            <p>{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );  
};

export default Projects;



/****  */