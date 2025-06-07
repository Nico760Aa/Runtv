import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextProps {
  darkMode: boolean;
  children: ReactNode;
}

const ThemeContext = createContext<{ darkMode: boolean }>({ darkMode: false });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<ThemeContextProps> = ({ darkMode, children }) => {
  return (
    <ThemeContext.Provider value={{ darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
