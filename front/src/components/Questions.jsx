import { useEffect, useState } from "react";

// Custom hook that returns all of the questions in the database as an array.
export default function useQuestions(id) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const baseURL = "/api/questions/";
    const URL = id ? `${baseURL}${id}` : baseURL;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  }, [id]);

  return questions;
}
