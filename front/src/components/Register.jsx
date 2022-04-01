import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import fetchWrapper from "../fetchWrapper";

export default function SignUp() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    setError("");
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    e.preventDefault();
    fetchWrapper
      .post(`/api/user/create/`, {
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
      })
      .then(() => {
        history.push("/login");
      })
      .catch((err) => {
        if (err.email) {
          setEmailError(err.email);
        }
        if (err.userName) {
          setUsernameError(err.userName);
        }
        if (err.password) {
          setPasswordError(err.password);
        }
        if (err.isString) {
          setError(err);
        }
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
      <h2 style={{ color: "red", fontSize: "12px" }}> {emailError}</h2>
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
      <h2 style={{ color: "red", fontSize: "12px" }}> {usernameError}</h2>
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
      <h2 style={{ color: "red", fontSize: "12px" }}> {passwordError}</h2>
      <button className="mybutton" type="button" onClick={handleSubmit}>
        Create Account
      </button>
      <br />
      <h2 style={{ color: "red", fontSize: "12px" }}> {error}</h2>
      <br />
      <h1 style={{ color: "blue", fontSize: "10px" }}>
        <Link to="/index">Back to polls</Link>
      </h1>
    </>
  );
}
