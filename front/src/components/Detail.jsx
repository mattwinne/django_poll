import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import useChoices from "components/Choices";
import useQuestions from "components/Questions";

const Detail = () => {
  // Pulls the slug from the current URL which represents the question ID. Assigns it to pathID
  const location = useLocation();
  const pathID = location.pathname.slice(-1);

  // useQuestions is a custom hook from another component that returns all questions in the database.
  // Utilizes pathID to identify which question we're on.
  // Would prefer that it returned the value as a string, but instead it is a single item array
  const question = useQuestions().filter((q) => {
    return q.id === pathID;
  });

  // useChoices is a custom hook form another component that returns all choices in the database.
  // Utilizes pathID to derive the set of choices associated with the question.
  const choices = useChoices().filter((c) => {
    return c.question === pathID;
  });

  const [radio, setRadio] = useState([]);

  // Initiates on button click.
  const updateVote = () => {
    // newData collects the selected choice ID and current votes from the radio button state.

    const newData = {
      // Since the value of the choice radio buttons were assinged as a string, e.g.(1,3) the values were
      // assigned by pulling out the individual characters and changing them to an integer.
      id: parseInt(radio[0], 10),
      // Increased vote count by one to account for user submission
      votes: parseInt(radio[2], 10) + 1,
    };
    // Utilized PATCH method because I am only updating the vote count, and not the other variables in the object array.
    fetch(`/api/choices/${radio[0]}/`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).then((result) => {
      result.json().then(() => {
        // Redirects to results.
        window.location.replace(`/results/${pathID}`);
      });
    });
  };

  // TODO: Needs to prevent vote action if no choice is selected
  return (
    <>
      {question.map((item) => (
        <h1 style={{ color: "blue", fontSize: "18px" }}>{item.text}</h1>
      ))}
      {question.length === 0 && (
        <h2 style={{ color: "black", fontSize: "10px" }}>
          {" "}
          ...loading questions
        </h2>
      )}

      {choices.map((item) => (
        <li style={{ color: "black", fontSize: "16px" }}>
          <input
            type="radio"
            value={[item.id, item.votes]}
            name="choice"
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          {item.text}
        </li>
      ))}
      {!choices.length && (
        <h2 style={{ color: "black", fontSize: "10px" }}> ...loading poll</h2>
      )}

      <br />

      <button className="mybutton" type="button" onClick={() => updateVote()}>
        Vote
      </button>

      <br />

      <h1 style={{ color: "blue", fontSize: "12px" }}>
        <Link to="/index">Back to polls</Link>
      </h1>
    </>
  );
};

export default Detail;
