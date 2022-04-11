import { NavLink } from "react-router-dom";
import React from "react";

function Header() {
  return (
    <nav>
      <NavLink exact activeClassName="active" to="/">
        {" "}
        Home
      </NavLink>
      <NavLink activeClassName="active" to="/profile">
        {" "}
        Profile
      </NavLink>
      <NavLink activeClassName="active" to="/create">
        {" "}
        Create
      </NavLink>
    </nav>
  );
}
export default Header;
