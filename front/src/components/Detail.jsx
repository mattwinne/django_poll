import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";
import axiosInstance from "../axios";
import useQuestions from "components/Questions";

const Detail = () => {
  const location = useLocation();
  const history = useHistory();
  const { slug } = location.state;
  const pageQuestion = useQuestions(slug);
  const pageChoices = pageQuestion.choices;
  if (pageChoices) {
    pageChoices.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  const [radio, setRadio] = useState([0]);
  const updateVote = () => {
    if (radio !== 0) {
      axiosInstance.get(`choices/${radio}/up_vote/`).then(() => {
        history.push(`/results/${slug}`, { slug });
      });
    }
  };

  return (
    <>
      <h1 style={{ color: "blue", fontSize: "18px" }}>{pageQuestion.text}</h1>
      {pageChoices ? (
        pageChoices.map((item) => (
          <h1 style={{ color: "black", fontSize: "16px" }} key={item.id}>
            <input
              type="radio"
              value={item.id}
              name="choice"
              onChange={(e) => {
                setRadio(e.target.value);
              }}
            />
            {item.text}
          </h1>
        ))
      ) : (
        <h2 style={{ color: "black", fontSize: "10px" }}> ...loading poll</h2>
      )}

      <button className="mybutton" type="button" onClick={() => updateVote()}>
        Vote
      </button>

      <br />

      <h1 style={{ color: "blue", fontSize: "16px" }}>
        <Link to="/index">Back to polls</Link>
      </h1>
    </>
  );
};

export default Detail;
