import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Tools from './components/Tools';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Recognition from './components/Recognition';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';


// The page is client-rendered, so a #hash in the URL points at an element that
// does not exist yet when the browser tries to jump to it. Re-apply the hash
// once React has mounted, and keep correcting while the entrance animations
// below the target are still shifting its position.
function useHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let raf = 0;
    let frames = 0;
    let settled = 0;
    let lastTop = null;

    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
        settled = top === lastTop ? settled + 1 : 0;
        lastTop = top;
        el.scrollIntoView({ block: 'start' });
      }
      // Stop once the target has held still for ~0.5s, or after ~3s.
      if (settled < 30 && (frames += 1) < 180) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
}

function App() {
  useHashScroll();

  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Experience />
      <Tools />
      <Projects />
      <Contact />
      <Recognition />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;


/***
 * 
 * 
 *        <Helmet>
        <title>Raiza QA Engineer Portfolio</title>
        <meta name="description" content="Explore the portfolio of Raiza, a skilled QA Engineer specializing in futuristic designs, web technologies, software and mobile testing." />
        <meta name="keywords" content="QA Engineer, Portfolio, ReactJS, Vercel, Framer Motion, Futuristic Design" />
        <meta name="author" content="Raiza" />
        <meta property="og:title" content="Raiza Kurniawan QA Engineer Portfolio" />
        <meta property="og:description" content="Discover Raiza's expertise in QA engineering, showcasing projects, achievements, and skills in a futuristic design." />
        <meta property="og:image" content="https://yourwebsite.com/assets/og-image.jpg" />
        <meta property="og:url" content="https://raizakurniawan.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Raiza QA Engineer Portfolio" />
        <meta name="twitter:description" content="Dive into the portfolio of Raiza, a QA Engineer with expertise in futuristic web design and software testing." />
        <meta name="twitter:image" content="https://yourwebsite.com/assets/twitter-image.jpg" />
      </Helmet>
 * 
 * 
 * 
 */