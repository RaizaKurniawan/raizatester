import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';  // Ikon untuk LinkedIn dan Github
import CVDownload from "./CVDownload"; // Import the CVDownload component


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    return (
      <header>
        <div className="header-container">
          <h1 className="logo">{"{qa_here}"}</h1>
          <div className="burger-menu" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} color="#fff" /> : <FaBars size={24} color="#fff" />}
          </div>
          <nav className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
            <a href="#about" title="About Me">About</a>
            <a href="#experience" title="Experience">Experience</a>
            <a href="#tools" title="Tools">Tools</a>
            <a href="#contact" title="Contact Me">Contact</a>
            <a href="https://github.com/RaizaKurniawan" target="_blank" rel="noopener noreferrer" title="Github">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/raiza-kurniawan/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href = "/downloadRaizaCV" rel="noopener noreferrer" title="Download CV"> 
              <CVDownload /> 
            </a>
          </nav>
        </div>
      </header>
    );
};

export default Header;
