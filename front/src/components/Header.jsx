import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import PollIcon from "@mui/icons-material/Poll";
import React, { useEffect, useState } from "react";
import { useAuth } from "../use-auth";

function Header() {
  const auth = useAuth();
  const history = useHistory();
  const [buttons, setButtons] = useState();
  const logout = () => {
    auth.signout();
    history.push("/login");
  };

  const authButtons = () => {
    return (
      <>
        <Button
          variant="default"
          sx={{ marginTop: "5px" }}
          onClick={() => history.push("/profile")}
        >
          Profile
        </Button>
        <Button
          variant="default"
          sx={{ marginTop: "5px" }}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </>
    );
  };

  const noAuthButtons = () => {
    return (
      <>
        <Button
          variant="default"
          sx={{ marginTop: "5px" }}
          onClick={() => history.push("/register")}
        >
          Register
        </Button>
        <Button
          variant="default"
          sx={{ marginTop: "5px" }}
          onClick={() => history.push("/login")}
        >
          Login
        </Button>
      </>
    );
  };

  useEffect(() => {
    if (auth.user) {
      setButtons(authButtons());
    } else {
      setButtons(noAuthButtons());
    }
  }, [auth.user]);

  return (
    <AppBar position="relative" display="flex">
      <Toolbar>
        <PollIcon sx={{ marginBottom: "5px" }} />
        <Typography>Poll In One</Typography>

        <Button
          variant="default"
          sx={{ marginTop: "5px" }}
          onClick={() => history.push("/index", { stateCount: 0 })}
        >
          Polls
        </Button>

        <Button
          variant="default"
          sx={{ marginTop: "5px" }}
          onClick={() => history.push("/create")}
        >
          Create
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        {buttons}
      </Toolbar>
    </AppBar>
  );
}
export default Header;
