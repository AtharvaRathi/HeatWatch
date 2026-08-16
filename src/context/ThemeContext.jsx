import React, { createContext, useContext } from 'react';

const ThemeContext = createContext({ darkMode: false, toggleDarkMode: () => {} });

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ darkMode: false, toggleDarkMode: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
