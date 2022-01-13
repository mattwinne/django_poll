import { Link } from "react-router-dom";
import React from "react";
import useQuestions from "components/Questions";

const Index = () => {
  const questions = useQuestions("get_queryset");
  const listQuestion = (item) => {
    const pollHeader = `- ${item.text}`;

    return (
      <h1 style={{ color: "black", fontSize: "16px" }} key={item.id}>
        <Link to={{ pathname: `/detail/${item.id}`, state: { slug: item.id } }}>
          {pollHeader}
        </Link>
      </h1>
    );
  };
  const noQuestions = () => (
    <h2 style={{ color: "black", fontSize: "10px" }}>...loading questions</h2>
  );

  return (
    <>
      <h1 style={{ color: "blue", fontSize: "18px" }}>Polls</h1>
      {questions.length > 0
        ? questions.map((item) => listQuestion(item))
        : noQuestions()}
    </>
  );
};

export default Index;
