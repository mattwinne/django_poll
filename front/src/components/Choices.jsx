import { useEffect, useState } from "react";
import fetchWrapper from "../newFetchWrapper";

export default function useChoices(id) {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const baseURL = "/api/choices/";
    const URL = id ? `${baseURL}${id}` : baseURL;
    fetchWrapper.get(URL).then((res) => {
      setChoices(res);
    });
  }, [id]);

  if (id) {
    return [choices];
  }
  return choices;
}
