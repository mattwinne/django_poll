import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import PollIcon from "@mui/icons-material/Poll";
import React from "react";

function Header() {
  const history = useHistory();

  return (
    <AppBar position="relative">
      <Toolbar>
        <PollIcon sx={{ marginBottom: "5px" }} />
        <Typography variant="h6">Poll In One</Typography>

        <Button onClick={() => history.push("/", { stateCount: 0 })}>
          Polls
        </Button>
        <Button onClick={() => history.push("/profile")}>Profile</Button>
        <Button onClick={() => history.push("/create")}>Create</Button>

        <Box sx={{ flexGrow: 1 }} />

        <Button onClick={() => history.push("/register")}>Register</Button>
        <Button onClick={() => history.push("/login")}>Login</Button>
        <Button onClick={() => history.push("/logout")}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
