import React, { createContext, useContext, useState, useEffect } from 'react';

    const ThemeContext = createContext();

    export const ThemeProvider = ({ children }) => {
      const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem('theme');
        return localTheme || 'dark'; // Default to dark theme
      });

      useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'light') {
          root.classList.remove('dark');
          root.classList.add('light');
        } else {
          root.classList.remove('light');
          root.classList.add('dark');
        }
        localStorage.setItem('theme', theme);
      }, [theme]);

      const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
      };

      return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    };

    export const useTheme = () => useContext(ThemeContext);