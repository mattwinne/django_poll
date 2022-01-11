import { Link } from "react-router-dom";
import React from "react";
import useQuestions from "components/Questions";

const Index = () => {
  const questions = useQuestions();
  const listQuestion = (item) => {
    const pollHeader = `- ${item.text}`;
    //const publishDate = `Published: ${item.pubDate}`;
    //assignment of a different key to each DOM element is a react requirement
    return (

      <h1 style={{ color: "black", fontSize: "16px" }}
          key = {item.id}>
        <Link to={`/detail/${item.id}`}>{pollHeader}</Link>
      </h1>
      /* <h1 style={{ color: "black", fontSize: "10px" }}
      key = {item.id + 1}>{publishDate}
      </h1> */
    )
    
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
