import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import axiosInstance from "../axios";

export default function SignUp() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`user/create/`, {
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
      })
      .then(() => {
        history.push("/login");
      });
  };

  return (
    <>
      <h1 style={{ color: "blue", fontSize: "18px" }}>Register an account</h1>
      <label htmlFor="email">
        Email
        <input
          type="text"
          id="email"
          name="email"
          required
          minLength="4"
          maxLength="255"
          size="10"
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor="username">
        Username
        <input
          type="text"
          id="username"
          name="username"
          required
          minLength="4"
          maxLength="25"
          size="10"
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor="password">
        Password
        <input
          type="text"
          id="password"
          name="password"
          required
          minLength="8"
          maxLength="256"
          size="10"
          onChange={handleChange}
        />
      </label>
      <br />
      <button className="mybutton" type="button" onClick={handleSubmit}>
        Create Account
      </button>
      <br />
      <br />
      <h1 style={{ color: "blue", fontSize: "10px" }}>
        <Link to="/index">Back to polls</Link>
      </h1>
    </>
  );
}
