import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import fetchWrapper from "../fetchWrapper";

export default function CreatePoll() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    question: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [error, setError] = useState("Enter question here...");

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    fetchWrapper
      .post(`/api/questions/create_question/`, { text: formData.question })
      .then((res) => {
        history.push(`/createchoices/${res.id}`, {
          slug: res.id,
          text: res.text,
        });
      })
      .catch((err) => {
        setError(err.text);
      });
  };

  return (
    <Container>
      <Box position="relative" width="100%">
        <Typography color="primary" variant="h4">
          Make a Poll
        </Typography>

        <TextField
          fullWidth
          id="outlined-basic"
          label={error}
          name="question"
          variant="outlined"
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSubmit} size="xl">
          Create
        </Button>
      </Box>
    </Container>
  );
}
