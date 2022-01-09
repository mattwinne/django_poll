import { Link } from "react-router-dom";
import React from "react";
import useQuestions from "components/Questions";

const Index = () => {
  const questions = useQuestions();
  const listQuestion = (item) => {
    const pollHeader = `- ${item.text}`;
    const publishDate = `Published: ${item.pubDate}`;
    return (
      <>
        <h1 style={{ color: "black", fontSize: "16px" }}>
          <Link to={`/detail/${item.id}`}>{pollHeader}</Link>
        </h1>
        <h2 style={{ color: "black", fontSize: "10px" }}>{publishDate}</h2>
      </>
    );
  };
  const noQuestions = () => (
    <h2 style={{ color: "black", fontSize: "10px" }}>...loading questions</h2>
  );

  return (
    <>
      <h1 style={{ color: "blue", fontSize: "18px" }}>Polls</h1>
      {questions.length > 0
        ? questions.slice(-5).map((item) => listQuestion(item))
        : noQuestions()}
    </>
  );
};

export default Index;
