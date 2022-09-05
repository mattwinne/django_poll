import { Grid, Switch, Typography } from "@mui/material";
import { useTheme, useThemeUpdate } from "../ThemeContext";
import React, { useState } from "react";
import fetchWrapper from "../fetchWrapper";

function DarkModeSelector() {
  const setTheme = useThemeUpdate();
  const darkTheme = useTheme();

  const [checked, setChecked] = useState(darkTheme);
  const darkSwitch = (e, val) => {
    if (val === true) {
      localStorage.setItem("darkMode", "true");
      setChecked(true);
      setTheme(true);
      fetchWrapper.patch(`/api/users/change_profile/`, { darkMode: true });
    } else if (val === false) {
      localStorage.setItem("darkMode", "false");
      setChecked(false);
      setTheme(false);
      fetchWrapper.patch(`/api/users/change_profile/`, { darkMode: false });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography
          variant="h6"
          color="txt"
          sx={{
            marginTop: "10px",
          }}
        >
          Dark Mode
        </Typography>
      </Grid>
      <Grid item>
        <Switch checked={checked} onChange={darkSwitch} />
      </Grid>
    </Grid>
  );
}
export default DarkModeSelector;
