import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import useQuestions from "components/Questions";

const Detail = () => {
  const location = useLocation();
  const pathID = location.pathname.slice(-1);

  const pageQuestion = useQuestions(pathID);
  const pageChoices = pageQuestion["choices"];


  const [radio, setRadio] = useState([]);

  const updateVote = () => {
    fetch(`/api/up_vote/${radio}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then((result) => {
      result.json().then(() => {
        window.location.replace(`/results/${pathID}`);
      });
    });
  };

  return (
    <>
      <h1 style={{ color: "blue", fontSize: "18px" }}>{pageQuestion.text}</h1>

      {pageChoices ? pageChoices.map((item) => (
        <li style={{ color: "black", fontSize: "16px" }}>
          <input
            type="radio"
            value={item.id}
            name="choice"
            onChange={(e) => {
              setRadio(e.target.value);
              console.log(e.target.value)
            }}
          />
          {item.text}
        </li>
      )) : console.log("nope")} 
      {/* {!pageChoices.length && (
        <h2 style={{ color: "black", fontSize: "10px" }}> ...loading poll</h2>
      )} */}

      <br />

      <button className="mybutton" type="button" onClick={() => updateVote()}>
        Vote
      </button>

      <br />

      <h1 style={{ color: "blue", fontSize: "12px" }}>
        <Link to="/index">Back to polls</Link>
      </h1>
    </>
  );
};

export default Detail;
