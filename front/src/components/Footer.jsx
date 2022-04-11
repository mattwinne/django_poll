import { NavLink } from "react-router-dom";
import React from "react";

function Footer() {
  return (
    <nav>
      <NavLink exact activeClassName="Create " to="/register">
        {" "}
        Register
      </NavLink>
      <NavLink activeClassName="active" to="/login">
        {" "}
        Login
      </NavLink>
      <NavLink activeClassName="active" to="/logout">
        {" "}
        Logout
      </NavLink>
    </nav>
  );
}

export default Footer;
