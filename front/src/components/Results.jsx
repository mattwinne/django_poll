import React from "react";
import { useLocation } from "react-router-dom";
import useQuestions from "components/Questions";

function Results() {
  const location = useLocation();
  const { slug } = location.state;
  const question = useQuestions(slug);
  const results = question.choices;
  if (results) {
    results.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  const displayResults = (result) => {
    const resultLine = `- ${result.text}:    ${result.votes} votes`;
    return (
      <h1 style={{ color: "black", fontSize: "16px" }} key={result.id}>
        {resultLine}
      </h1>
    );
  };
  const noResults = () => {
    return (
      <h2 style={{ color: "black", fontSize: "10px" }}> ...loading poll</h2>
    );
  };
  return (
    <>
      <h1 style={{ color: "blue", fontSize: "18px" }}>{question.text}</h1>
      {results ? results.map((result) => displayResults(result)) : noResults()}
    </>
  );
}

export default Results;
