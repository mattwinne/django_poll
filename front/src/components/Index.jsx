import { Link } from "react-router-dom";
import React from "react";
import useQuestions from "components/Questions";
// Currently displays all questions in database. Not practical if there are a lot of questions. Need to update so
// that it displays the five latest polls.
const Index = () => {
  const questions = useQuestions();
  const listQuestion = (item) => {
    const pollHeader = `-${item.id}:${item.text}`;
    const publishDate = `Published: ${item.pubDate}`;

    return (
      <li>
        <h1 style={{ color: "black", fontSize: "16px" }}>
          <Link to={`/detail/${item.id}`}>{pollHeader}</Link>
        </h1>
        <h2 style={{ color: "black", fontSize: "10px" }}>{publishDate}</h2>
      </li>
    );
  };
  const noQuestions = () => (
    <h2 style={{ color: "black", fontSize: "10px" }}>...loading questions</h2>
  );

  return (
    <>
      <h1 style={{ color: "blue", fontSize: "32px" }}>Polls</h1>
      {questions.length > 0
        ? questions.map((item) => listQuestion(item))
        : noQuestions()}
    </>
  );
};

export default Index;
