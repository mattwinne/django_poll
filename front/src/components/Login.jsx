import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { fetchHeaders, fetchWrapper } from "../fetchWrapper";

export default function SignIn() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    setError("");
    setPasswordError("");
    setEmailError("");

    e.preventDefault();
    fetchWrapper
      .post(`/api/token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.access);
        localStorage.setItem("refresh_token", res.refresh);
        fetchHeaders.Authorization = `JWT ${localStorage.getItem(
          "access_token"
        )}`;
        history.push("/index");
      })
      .catch((err) => {
        if (err.email) {
          setEmailError(err.email);
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
      <h1 style={{ color: "blue", fontSize: "18px" }}>Login</h1>
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
        Login
      </button>
      <br />
      <h2 style={{ color: "red", fontSize: "12px" }}> {error}</h2>
      <br />
    </>
  );
}
