import { motion } from "framer-motion";
import { FaArrowLeft, FaGithub, FaLinkedin } from "react-icons/fa";
import { experiences } from "../components/Experience";
import { qaProjects, nonQaProjects } from "../components/Projects";
import ScrollToTop from "../components/ScrollToTop";

// Dates come from the downloadable CV (public/assets/RaizaKurniawan_CV2026.pdf).
// Roles without a known period render without a badge.
const periods = {
  OCX: "Oct 2025 – Present",
  "Labtek Indie": "Aug – Sep 2025",
  "Confiction Labs.": "Mar 2022 – May 2025",
  Agate: "Mar 2022 – Jun 2025",
  "BenihBaik.com": "Feb 2022 – Mar 2023",
};

const projectPeriods = {
  "Lets Flip": "Jan – Feb 2021",
  "Paron Indonesia": "Aug 2020 – Mar 2021",
  "Integral Asia Pacific": "Nov 2018 – Feb 2020",
};

const fadeUp = (i) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: Math.min(i, 3) * 0.08 },
});

const ProjectList = ({ items, accent }) => (
  <div className="xp-projects">
    {items.map((p, i) => (
      <motion.div
        key={p.title}
        className="xp-project"
        style={{ "--card-accent": accent }}
        {...fadeUp(i)}
      >
        <div className="xp-project-head">
          <span className="xp-project-icon">{p.icon}</span>
          <div>
            <h3>{p.title}</h3>
            <h4>{p.role}</h4>
          </div>
        </div>
        {projectPeriods[p.title] && <span className="xp-period">{projectPeriods[p.title]}</span>}
        <p>{p.description}</p>
      </motion.div>
    ))}
  </div>
);

const ExperiencePage = () => {
  return (
    <div className="xp-page">
      <header className="xp-topbar">
        <a href="/" className="xp-back">
          <FaArrowLeft /> Back to portfolio
        </a>
        <div className="xp-social">
          <a href="https://github.com/RaizaKurniawan" target="_blank" rel="noopener noreferrer" title="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/raiza-kurniawan/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedin size={20} />
          </a>
        </div>
      </header>

      <section className="xp-hero">
        <span className="experience-eyebrow">Career</span>
        <h1 className="experience-title">All Experience</h1>
        <p className="xp-intro">
          Raiza Kurniawan, Senior QA Engineer. From IT support and software implementation
          to leading QA for Web3 products and owning quality for a multi-platform marketplace.
        </p>
      </section>

      <section className="xp-block">
        <h2 className="xp-block-title">QA Roles</h2>
        <ol className="xp-timeline">
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.id}
              className="xp-item"
              style={{ "--card-accent": exp.accentColor }}
              {...fadeUp(i)}
            >
              <span className="xp-dot" />
              <div className="experience-card xp-card">
                <div className="xp-card-head">
                  <div className="experience-icon">{exp.icon}</div>
                  <div>
                    <h3>{exp.title}</h3>
                    <h4>{exp.company}</h4>
                  </div>
                  {periods[exp.company] && <span className="xp-period">{periods[exp.company]}</span>}
                </div>
                <div>{exp.description}</div>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="xp-block">
        <h2 className="xp-block-title">QA Projects</h2>
        <ProjectList items={qaProjects} accent="#00d4ff" />
      </section>

      <section className="xp-block">
        <h2 className="xp-block-title">Earlier IT Roles</h2>
        <ProjectList items={nonQaProjects} accent="#94a3b8" />
      </section>

      <footer className="xp-footer">
        <a href="/#contact" className="xp-cta">Get in touch</a>
        <p>© {new Date().getFullYear()} Raiza Kurniawan. All Rights Reserved.</p>
      </footer>
      <ScrollToTop />
    </div>
  );
};

export default ExperiencePage;
