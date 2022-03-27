import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";
import fetchWrapper from "../newFetchWrapper";

export default function CreateChoices() {
  const history = useHistory();
  const location = useLocation();
  const { slug } = location.state;
  const question = location.state.text;
  const initialFormData = Object.freeze({
    question: "",
  });
  const [choices, setChoices] = useState([]);
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWrapper
      .post(`/api/choices/`, { text: formData.choice, question: slug })
      .then((res) => {
        setChoices(choices.concat(res.text));
      });
  };

  const displayChoices = (choice) => {
    const choiceLine = `- ${choice}`;
    return <h1 style={{ color: "black", fontSize: "16px" }}>{choiceLine}</h1>;
  };

  const noChoices = () => {
    return <h2 style={{ color: "black", fontSize: "16px" }}> Add choices</h2>;
  };
  const finish = () => {
    history.push("/index");
  };
  return (
    <>
      <h1 style={{ color: "blue", fontSize: "18px" }}>Create a Poll</h1>
      <h2 style={{ color: "black", fontSize: "16px" }}> {question}</h2>
      {choices ? choices.map((choice) => displayChoices(choice)) : noChoices()}

      <label htmlFor="choice">
        Choice:
        <input
          type="text"
          id="choice"
          name="choice"
          required
          minLength="1"
          maxLength="256"
          size="10"
          onChange={handleChange}
        />
      </label>
      <br />
      <button className="mybutton" type="button" onClick={handleSubmit}>
        Create Choice
      </button>
      <br />
      <br />
      <button className="mybutton" type="button" onClick={finish}>
        Finish Poll
      </button>
      <br />
      <br />
      <h1 style={{ color: "blue", fontSize: "10px" }}>
        <Link to="/index">Back to polls</Link>
      </h1>
    </>
  );
}
