import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaFilePdf, FaWhatsapp } from "react-icons/fa";

const links = [
  {
    href: "https://wa.me/6281224221110",
    label: "WhatsApp",
    icon: <FaWhatsapp />,
    primary: true,
    external: true,
  },
  {
    href: "mailto:raizakurniawan@gmail.com",
    label: "Email Me",
    icon: <FaEnvelope />,
    primary: true,
    external: false,
  },
  {
    href: "https://www.linkedin.com/in/raiza-kurniawan",
    label: "LinkedIn",
    icon: <FaLinkedin />,
    primary: false,
    external: true,
  },
  {
    href: "https://github.com/RaizaKurniawan",
    label: "GitHub",
    icon: <FaGithub />,
    primary: false,
    external: true,
  },
  {
    href: "/assets/RaizaKurniawan_Resume2025.pdf",
    label: "Download Resume",
    icon: <FaFilePdf />,
    primary: false,
    external: true,
  },
  {
    href: "/assets/RaizaKurniawan_CV2025.pdf",
    label: "Download CV",
    icon: <FaFilePdf />,
    primary: false,
    external: true,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <span className="contact-eyebrow">Get in touch</span>
      <h2 className="contact-title">Contact Me</h2>
      <p className="contact-subtitle">
        I'm always open to collaborating on exciting projects or just having a chat!
      </p>

      <div className="contact-grid">
        {links.map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            className={`contact-link${link.primary ? " primary" : ""}`}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="contact-icon">{link.icon}</span>
            {link.label}
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
