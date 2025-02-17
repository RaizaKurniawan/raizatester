import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Tools from './components/Tools';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Experience />
      <Tools />
      <Projects />
      <Contact />
      <Certifications />
      <Achievements />
      <Footer />
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