import { useEffect, useState } from "react";

// Custom hook that returns all of the choices in the database as an array.
export default function useChoices(id) {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const baseURL = "/api/choices/";
    const URL = id ? `${baseURL}${id}` : baseURL;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setChoices(data);
      });
  }, [id]);

  if (id) {
    return [choices];
  }
  return choices;
}
