import { createContext, useState, useMemo, type ReactNode } from 'react';
import { getThemeClasses } from './theme.config';
import type { ThemeClasses } from './theme.config';

interface ThemeContextType {
  darkMode: boolean;
  theme: ThemeClasses;
  toggleDarkMode: () => void;
}

/* eslint-disable react-refresh/only-export-components */
export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  theme: getThemeClasses(false) as ThemeClasses,
  toggleDarkMode: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((p) => !p);

  const theme = useMemo(() => getThemeClasses(darkMode), [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, theme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
