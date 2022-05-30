import React, { createContext, useContext, useEffect, useState } from "react";

const paletteContext = createContext();

export function ProvidePalette({ children }) {
    const palette = useProvidePalette();
    return <paletteContext.Provider value={palette}>{children}</paletteContext.Provider>;
  }
  export const usePalette = () => {
    return useContext(paletteContext);
  };
  
  function useProvidePalette() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("dark_mode") ? true : null);
    const on = () => {
        console.log("on")
      setDarkMode(true)
    }
    const off = () => {
        console.log("off")
      setDarkMode(false)
    }
    useEffect(() => {
      const unsubscribe = () => {
        if (darkMode) {
          setDarkMode(darkMode);
        } else {
          setDarkMode(false);
        }
      };
      return () => unsubscribe();
    }, []);
    return{
        darkMode,
        on,
        off
    }
  }