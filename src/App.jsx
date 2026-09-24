import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SectionProvider } from './context/SectionContext';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <SectionProvider>
        <div className="portfolio-app-root">
          {/* Smooth trailing custom cursor */}
          <CustomCursor />

          {/* Sticky pill navbar */}
          <Navbar />

        {/* Main Sections */}
        <main id="main-content">
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Certifications />
          <Resume />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
      </SectionProvider>
    </ThemeProvider>
  );
}
