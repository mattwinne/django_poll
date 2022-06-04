import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchWrapper, header } from "./fetchWrapper";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(
    localStorage.getItem("access_token") ? true : null
  );

  const signout = () => {
    fetchWrapper
      .post("/api/user/logout/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("darkMode");
        header.Authorization = null;
        setUser(false);
      });
  };

  const signin = () => {
    setUser(true);
  };

  useEffect(() => {
    const unsubscribe = () => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    };
    return () => unsubscribe();
  }, []);
  return {
    user,
    signout,
    signin,
  };
}
