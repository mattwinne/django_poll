import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import PollIcon from "@mui/icons-material/Poll";
import React from "react";
import theme from "../styles";

function Header() {
  const history = useHistory();
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative">
        <Toolbar>
          <PollIcon sx={{ marginBottom: "5px" }} />
          <Typography variant="h6">Poll In One</Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button onClick={() => history.push("/")} sx={{ color: "black" }}>
              Polls
            </Button>
            <Button
              onClick={() => history.push("/profile")}
              sx={{ color: "black" }}
            >
              Profile
            </Button>
            <Button
              onClick={() => history.push("/create")}
              sx={{ color: "black" }}
            >
              Create
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => history.push("/register")}
              sx={{ color: "black" }}
            >
              Register
            </Button>
            <Button
              onClick={() => history.push("/login")}
              sx={{ color: "black" }}
            >
              Login
            </Button>
            <Button
              onClick={() => history.push("/logout")}
              sx={{ color: "black" }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
export default Header;
