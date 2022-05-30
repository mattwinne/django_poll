import { ThemeProvider } from "@mui/material/styles";
import React, { useContext, useState } from "react";
import fetchWrapper from "./fetchWrapper";
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
  // utilizes localstorage to cache setting for quick load on refresh
  let initialTheme = !!localStorage.getItem("darkMode");
  // validates localstorage setting
  fetchWrapper.get(`/api/users/get_user_profile/`).then((res) => {
    initialTheme = res.darkMode;
  });
  const [darkTheme, setDarkTheme] = useState(initialTheme);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    fetchWrapper.patch(`/api/users/switch_dark_mode/`);
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
