import React from "react";
import { useTheme } from "./ThemeContext";
import theme from "./styles";

export default function Layout() {
  const darkTheme = useTheme();
  const appTheme = darkTheme ? theme.dark : theme.light;

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=.75, user-scalable=0, maximum-scale=.75, minimum-scale=.75"
      />
      <div
        style={{
          position: "absolute",
          backgroundColor: appTheme.palette.bg.main,
          top: "0px",
          bottom: "0px",
          width: "100%",
        }}
      />
    </>
  );
}
