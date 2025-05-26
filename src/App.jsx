import React from 'react';
    import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import Layout from '@/components/Layout';
    import HomePage from '@/pages/HomePage';
    import AdminPage from '@/pages/AdminPage';
    import ContactPage from '@/pages/ContactPage';
    import MoviesPage from '@/pages/MoviesPage';
    import { Toaster } from '@/components/ui/toaster';
    import { AnimeSiteProvider } from '@/contexts/AnimeSiteContext';
    import { MovieSiteProvider } from '@/contexts/MovieSiteContext';
    import { ThemeProvider } from '@/contexts/ThemeContext';
    import MusicPlayer from '@/components/MusicPlayer';

    function App() {
      return (
        <ThemeProvider>
          <AnimeSiteProvider>
            <MovieSiteProvider>
              <Router>
                <Layout>
                  <AppRoutes />
                  <MusicPlayer />
                </Layout>
                <Toaster />
              </Router>
            </MovieSiteProvider>
          </AnimeSiteProvider>
        </ThemeProvider>
      );
    }

    const AppRoutes = () => {
      const location = useLocation();
      return (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
            <Route path="/movies" element={<AnimatedPage><MoviesPage /></AnimatedPage>} />
            <Route path="/admin" element={<AnimatedPage><AdminPage /></AnimatedPage>} />
            <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      );
    };
    
    const pageVariants = {
      initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
      },
      in: {
        opacity: 1,
        y: 0,
        scale: 1,
      },
      out: {
        opacity: 0,
        y: -20,
        scale: 1.02,
      }
    };

    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.5
    };

    const AnimatedPage = ({ children }) => (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex-grow flex flex-col"
      >
        {children}
      </motion.div>
    );
    AnimatedPage.displayName = "AnimatedPage";

    export default App;