import { Link } from "react-router-dom";
import React from "react";

const NotFound = () => (
  <>
    <h1 style={{ color: "black", fontSize: "16px" }}>
      This page does not exist.
    </h1>
    <h1 style={{ color: "blue", fontSize: "16px" }}>
      <Link to="/index">Back to polls</Link>
    </h1>
  </>
);

export default NotFound;
