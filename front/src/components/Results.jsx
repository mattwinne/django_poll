import { Link, useLocation } from "react-router-dom";
import React from "react";
import useChoices from "components/Choices";
import useQuestions from "components/Questions";

const Results = () => {
  const location = useLocation();
  const pathID = location.pathname.slice(-1);
  const question = useQuestions(pathID);
  const results = question["choices"];

  return (
    <>
      <h1 style={{ color: "blue", fontSize: "18px" }}>{question.text}</h1>
        
      {results ? results.map((result) => (
        <li style={{ color: "black", fontSize: "16px" }}>
          {result.text}
          --
          {result.votes}
           votes 
        </li>
      )): console.log("no sir")}
      {
        <h1 style={{ color: "blue", fontSize: "16px" }}>
          <Link to="/index">Back to polls</Link>
        </h1>
      }
    </>
  );
};

export default Results;
