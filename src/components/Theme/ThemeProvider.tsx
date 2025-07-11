import React, { ReactNode } from 'react';
import { ThemeContext, createThemeFunctions } from '../../hooks/useTheme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = createThemeFunctions();

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;