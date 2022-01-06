import { useEffect, useState } from "react";

// Custom hook that returns all of the questions in the database as an array.
export default function useQuestions(id) {
  
  console.log("useQuestions fuction start")
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const baseURL = "/api/questions/";
    const URL = id ? `${baseURL}${id}` : baseURL;
    console.log("URL:" + URL)
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: " + data)
        setQuestions(data);
      });
  }, [id]);
console.log("in useQuestions" + questions)
return questions;
} 
  