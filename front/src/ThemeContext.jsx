import { ThemeProvider } from "@mui/material/styles";
import React, { useContext, useState } from "react";
import theme from "./styles";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function CustomThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        <ThemeProvider theme={darkTheme ? theme.dark : theme.light}>
          {children}
        </ThemeProvider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
