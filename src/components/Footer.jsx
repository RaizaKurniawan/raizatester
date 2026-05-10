
const Footer = () => {
  return (
    <footer>
      <svg
        className="footer-wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="#f8faff"
          d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z"
        />
      </svg>

      <div className="footer-content">
        <div className="footer-logo">
          &lt;<span className="footer-logo-accent">QA</span>/&gt;
        </div>
        <p className="footer-tagline">Building quality into every layer.</p>
        <div className="footer-divider" />
        <p className="footer-copy">© 2025 Raiza Kurniawan. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
