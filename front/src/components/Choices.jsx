import { useEffect, useState } from "react";
import axiosInstance from "../axios";

export default function useChoices(id) {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const baseURL = "choices/";
    const URL = id ? `${baseURL}${id}` : baseURL;
    axiosInstance.get(URL).then((res) => {
      setChoices(res.data);
    });
  }, [id]);

  if (id) {
    return [choices];
  }
  return choices;
}
