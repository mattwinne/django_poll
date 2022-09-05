import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import HeaderButton from "./HeaderButton";
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
        <HeaderButton text="Profile" />
        <HeaderButton text="Logout" clickHandler={logout} />
      </>
    );
  };

  const noAuthButtons = () => {
    return (
      <>
        <HeaderButton text="Register" />
        <HeaderButton text="Login" />
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

        <HeaderButton text="Polls" />

        {auth.user && <HeaderButton text="Create" />}

        <Box sx={{ flexGrow: 1 }} />
        {buttons}
      </Toolbar>
    </AppBar>
  );
}
export default Header;
