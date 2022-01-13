import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";
import useQuestions from "components/Questions";

const Detail = () => {
  const location = useLocation();
  const history = useHistory();
  const slug = location.state.slug;
  const pageQuestion = useQuestions(slug);
  const pageChoices = pageQuestion.choices;
  const [radio, setRadio] = useState([0]);
  const updateVote = () => {
    if (radio != 0) {
      fetch(`/api/choices/${radio}/up_vote/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((result) => {
        result.json().then(() => {
          history.push(`/results/${slug}`, { slug: slug });
        });
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
