import { Link, useLocation } from "react-router-dom";
import React from "react";
import useChoices from "components/Choices";
import useQuestions from "components/Questions";

const Results = () => {
  const location = useLocation();
  const pathID = location.pathname.slice(-1);
  const question = useQuestions().filter((q) => {
    return q.id === pathID;
  });
  const results = useChoices().filter((c) => {
    return c.question === pathID;
  });

  return (
    <div>
      {question.length > 0 ? (
        question.map((item) => (
          <li>
            <h1 style={{ color: "blue", fontSize: "18px" }}>{item.text}</h1>
          </li>
        ))
      ) : (
        <h2 style={{ color: "black", fontSize: "10px" }}>
          ...loading questions
        </h2>
      )}
      )
      {results.map((result) => (
        <li style={{ color: "black", fontSize: "16px" }}>
          {result.text}
          --
          {result.votes}
          votes
        </li>
      ))}
      {
        <h1 style={{ color: "blue", fontSize: "16px" }}>
          <Link to="/index">Back to polls</Link>
        </h1>
      }
    </div>
  );
};

export default Results;
