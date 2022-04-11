import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import fetchWrapper from "../fetchWrapper";

function Profile() {
  const [userName, setUserName] = useState("");
  const [myQuestions, setMyQuestions] = useState([""]);
  const initialFormData = Object.freeze("");
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  useEffect(() => {
    fetchWrapper.get(`/api/users/get_user_profile/`).then((res) => {
      setUserName(res.userName);
      setMyQuestions(res.questions);
    });
  }, []);
  const listQuestion = (item) => {
    const pollHeader = `- ${item.text}`;
    const route = `/results/${item.id}`;
    return (
      <h1 style={{ color: "black", fontSize: "12px" }} key={item.id}>
        <Link to={{ pathname: route, state: { slug: item.id } }}>
          {pollHeader}
        </Link>
      </h1>
    );
  };
  function changeUsername() {
    fetchWrapper.patch(`/api/users/change_user_name/`, formData).then((res) => {
      setUserName(res.userName);
    });
  }

  return (
    <>
      <h1 style={{ color: "blue", fontSize: "16px" }}>Profile</h1>
      <h1 style={{ color: "black", fontSize: "12px" }}>
        Username: {userName}
        <label htmlFor="userName">
          <input
            type="text"
            id="userName"
            name="userName"
            required
            minLength="4"
            maxLength="255"
            size="10"
            onChange={handleChange}
          />
        </label>
        <button className="mybutton" type="button" onClick={changeUsername}>
          Change username
        </button>
      </h1>
      <h1 style={{ color: "black", fontSize: "12px" }}>Your Polls:</h1>
      {myQuestions.map((item) => listQuestion(item))}
      <h1 style={{ color: "blue", fontSize: "10px" }}>
        <Link to="/create">Create a Poll</Link>
      </h1>
    </>
  );
}

export default Profile;
