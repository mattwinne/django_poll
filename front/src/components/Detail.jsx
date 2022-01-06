import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import useQuestions from "components/Questions";

const Detail = () => {
  const location = useLocation();
  const pathID = location.pathname.slice(-1);

  const pageQuestion = useQuestions(pathID);
  const pageChoices = pageQuestion["choices"];
  console.log(pageQuestion)
  console.log(pageChoices)

  const [radio, setRadio] = useState([]);

  const updateVote = () => {
    const newData = {
      id: parseInt(radio[0], 10),
      votes: parseInt(radio[2], 10) + 1,
    };

    fetch(`/api/choices/${radio[0]}/`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).then((result) => {
      result.json().then(() => {
        window.location.replace(`/results/${pathID}`);
      });
    });
  };


  return (
    <>
      {console.log("return portion")}
        <h1 style={{ color: "blue", fontSize: "18px" }}>{pageQuestion.text}</h1>

      {/* This code breaks it because pageChoices is undefined at the moment the code is read 
      {pageChoices.map((item) => (
        <li style={{ color: "black", fontSize: "16px" }}>
          <input
            type="radio"
            value={[item.id, item.votes]}
            name="choice"
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          {item.text}
        </li>
      ))} 
      {!pageChoices.length && (
        <h2 style={{ color: "black", fontSize: "10px" }}> ...loading poll</h2>
      )}*/}

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
