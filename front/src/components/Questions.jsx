import { useEffect, useState } from "react";
import axiosInstance from "../axios";

export default function useQuestions(id) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const baseURL = "questions/";
    const URL = id ? `${baseURL}${id}` : baseURL;
    axiosInstance.get(URL).then((res) => {
      setQuestions(res.data);
    });
  }, [id]);

  return questions;
}
