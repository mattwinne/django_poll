import { useEffect, useState } from "react";
import fetchWrapper from "../fetchWrapper";

export default function useQuestions(id) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const baseURL = "/api/questions/";
    const URL = id ? `${baseURL}${id}/` : baseURL;
    fetchWrapper.get(URL).then((res) => {
      setQuestions(res);
    });
  }, [id]);

  return questions;
}
