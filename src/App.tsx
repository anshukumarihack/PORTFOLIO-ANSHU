import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import AIChat from './components/AIChat';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Certifications from './sections/Certifications';
import Achievements from './sections/Achievements';
import CodingProfiles from './sections/CodingProfiles';
import Statistics from './sections/Statistics';
import Services from './sections/Services';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen bg-dark-950 text-dark-50 overflow-x-hidden">
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Achievements />
            <CodingProfiles />
            <Statistics />
            <Services />
            <Testimonials />
            <Contact />
          </main>

          <Footer />
          <AIChat />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
