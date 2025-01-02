import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';  // Ikon untuk LinkedIn dan Github

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
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#tools">Tools</a>
            <a href="#contact">Contact</a>
            <a href="https://github.com/RaizakKurniawan" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/raiza-kurniawan/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
          </nav>
        </div>
      </header>
    );
};

export default Header;
