import { ThemeProvider } from "@mui/material/styles";
import React, { useContext, useState } from "react";
import fetchWrapper from "./fetchWrapper";
import theme from "./styles";
import { useAuth } from "./use-auth";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function CustomThemeProvider({ children }) {
  const auth = useAuth();
  // utilizes localstorage to cache setting for quick load on refresh
  let initialTheme;
  // validates localstorage setting
  if (localStorage.getItem("darkMode") === "true") {
    initialTheme = true;
  } else if (localStorage.getItem("darkMode") === "false") {
    initialTheme = false;
  } else if (auth.user) {
    fetchWrapper.get(`/api/users/get_user_profile/`).then((res) => {
      initialTheme = res.darkMode;
      localStorage.setItem("darkMode", res.darkMode);
    });
  } else {
    initialTheme = false;
  }

  const [darkTheme, setDarkTheme] = useState(initialTheme);

  const setTheme = (val) => {
    setDarkTheme(val);
    // fetchWrapper.patch(`/api/users/switch_dark_mode/`);
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={setTheme}>
        <ThemeProvider theme={darkTheme ? theme.dark : theme.light}>
          {children}
        </ThemeProvider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
