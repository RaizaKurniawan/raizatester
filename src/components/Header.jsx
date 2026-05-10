import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaFilePdf } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="header-container">
        <h1 className="logo">
          &lt;<span className="logo-accent">QA</span>/&gt;
        </h1>

        <div className="burger-menu" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <FaTimes size={22} color="#fff" /> : <FaBars size={22} color="#fff" />}
        </div>

        <nav className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#tools" onClick={closeMenu}>Tools</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="#achievements" onClick={closeMenu}>Achievements</a>
          <a
            href="https://github.com/RaizaKurniawan"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            onClick={closeMenu}
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/raiza-kurniawan/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            onClick={closeMenu}
          >
            <FaLinkedin size={20} />
          </a>
          <a href="#contact" title="Download Resume & CV" onClick={closeMenu}>
            <FaFilePdf size={20} />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
