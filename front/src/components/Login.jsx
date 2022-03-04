import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { fetchHeaders, fetchWrapper } from "../newFetchWrapper";

export default function SignIn() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
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
        Login
      </button>
      <br />
      <br />
      <h1 style={{ color: "blue", fontSize: "10px" }}>
        <Link to="/index">Back to polls</Link>
      </h1>
      <h1 style={{ color: "blue", fontSize: "10px" }}>
        <Link to="/register">Create an account</Link>
      </h1>
    </>
  );
}
