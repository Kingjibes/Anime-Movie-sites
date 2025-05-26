import React from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Tv, ShieldCheck, MessageSquare, Film, Sun, Moon } from 'lucide-react';
    import { useTheme } from '@/contexts/ThemeContext';
    import { Button } from '@/components/ui/button';

    const Header = () => {
      const { theme, toggleTheme } = useTheme();

      const navItems = [
        { path: '/', name: 'Anime', icon: <Tv className="w-5 h-5 mr-2" /> },
        { path: '/movies', name: 'Movies', icon: <Film className="w-5 h-5 mr-2" /> },
        { path: '/admin', name: 'Admin Panel', icon: <ShieldCheck className="w-5 h-5 mr-2" /> },
        { path: '/contact', name: 'Contact', icon: <MessageSquare className="w-5 h-5 mr-2" /> },
      ];

      const headerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.2 } },
      };

      const navItemVariants = {
        hover: { scale: 1.1, y: -2, color: 'hsl(var(--primary))' },
        tap: { scale: 0.95 },
      };
      
      const logoVariants = {
        hover: { scale: 1.05, textShadow: "0px 0px 8px hsl(var(--primary))" },
        tap: { scale: 0.95 }
      }

      return (
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="sticky top-0 z-50 shadow-lg glassmorphism"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
            <motion.custom
              variants={logoVariants}
              whileHover="hover"
              whileTap="tap"
              className="mb-4 sm:mb-0"
            >
            <Link to="/" className="text-2xl md:text-3xl font-bold">
              <span className="gradient-text" style={{ fontFamily: "'Orbitron', sans-serif" }}>MediaVerse</span>
              <span className="text-sm text-muted-foreground"> by Hackerpro</span>
            </Link>
            </motion.custom>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ul className="flex space-x-2 sm:space-x-3">
                {navItems.map((item) => (
                  <motion.li key={item.path} variants={navItemVariants} whileHover="hover" whileTap="tap">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center px-2 py-2 sm:px-3 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
                         ${isActive
                          ? 'bg-primary text-primary-foreground shadow-md animate-pulse-glow'
                          : 'text-foreground hover:bg-primary/10' 
                        }`
                      }
                    >
                      {item.icon}
                      <span className="hidden sm:inline">{item.name}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === 'dark' ? (
                       <motion.div key="sun" initial={{rotate: -90, scale:0}} animate={{rotate:0, scale:1}} exit={{rotate:90, scale:0}} transition={{duration:0.3}}>
                         <Sun className="h-[1.2rem] w-[1.2rem]" />
                       </motion.div>
                    ) : (
                      <motion.div key="moon" initial={{rotate: 90, scale:0}} animate={{rotate:0, scale:1}} exit={{rotate:-90, scale:0}} transition={{duration:0.3}}>
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </nav>
        </motion.header>
      );
    };

    export default Header;