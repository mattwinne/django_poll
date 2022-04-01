import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import fetchWrapper from "../fetchWrapper";

export default function CreatePoll() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    question: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    fetchWrapper
      .post(`/api/questions/`, { text: formData.question })
      .then((res) => {
        history.push(`/createchoices/${res.id}`, {
          slug: res.id,
          text: res.text,
        });
      })
      .catch((err) => {
        setError(err.text);
      });
  };

  return (
    <>
      <h1 style={{ color: "blue", fontSize: "18px" }}>Create a Poll</h1>
      <label htmlFor="question">
        Question:
        <input
          type="text"
          id="question"
          name="question"
          required
          minLength="1"
          maxLength="256"
          size="10"
          onChange={handleChange}
        />
      </label>
      <h2 style={{ color: "red", fontSize: "16px" }}> {error}</h2>
      <button className="mybutton" type="button" onClick={handleSubmit}>
        Create Poll
      </button>

      <br />
      <h1 style={{ color: "blue", fontSize: "10px" }}>
        <Link to="/index">Back to polls</Link>
      </h1>
    </>
  );
}
