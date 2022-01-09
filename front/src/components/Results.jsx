import { Link, useLocation } from "react-router-dom";
import React from "react";
import useChoices from "components/Choices";
import useQuestions from "components/Questions";

const Results = () => {
  const location = useLocation();
  const pathID = location.pathname.slice(-1);
  const question = useQuestions(pathID);
  const results = question["choices"];
  
  const displayResults = (result) => {
    const resultLine = `- ${result.text}:    ${result.votes} votes`;
    return (
      <h1 style={{ color: "black", fontSize: "16px" }}>
        {resultLine}
      </h1>
    )
  }
  const noResults = () => {
    return (
      <h2 style={{ color: "black", fontSize: "10px" }}> ...loading poll</h2>
    )
  }
  return (
    <>
      <h1 style={{ color: "blue", fontSize: "18px" }}>
        {question.text}
      </h1>
        
      {results ? results.map((result) => (
        displayResults(result)
      )): noResults }

      <h1 style={{ color: "blue", fontSize: "16px" }}>
          <Link to="/index">Back to polls</Link>
      </h1>
      
    </>
  );
};

export default Results;
