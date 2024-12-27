import React from "react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';  // Ikon untuk LinkedIn dan Github

const Header = () => {
    return (
      <header>
        <div className="header-container">
          <h1 className="logo">Raiza Kurniawan - QA Engineer</h1>
          <nav className="nav-menu">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <a href="https://github.com/raizakurniawan" target="_blank" rel="noopener noreferrer">
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
