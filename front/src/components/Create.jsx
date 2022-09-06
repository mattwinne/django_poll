import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import fetchWrapper from "../fetchWrapper";

export default function CreatePoll() {
  const history = useHistory();
  const initialFormData = Object.freeze({});

  const [formData, updateFormData] = useState(initialFormData);
  const [error, setError] = useState("Enter question here...");
  const formLength = Object.keys(formData).length;
  const minChoices = 2;
  const numOfChoices = formLength - 1; // total items minus the one question
  const disabled = numOfChoices < minChoices;

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
        for (let i = 0; i < numOfChoices; i++) {
          fetchWrapper
            .post(`/api/choices/`, {
              text: formData[`choice${i}`],
              question: res.id,
            })
            .then(() => history.push("/polls"))
            .catch((err) => {
              setError(err.text);
            });
        }
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
        {Array(formLength)
          .fill(0)
          .map((num, idx) => {
            return (
              <TextField
                fullWidth
                id="outlined-basic"
                key={idx}
                label={`Choice ${idx + 1}`}
                name={`choice${idx}`}
                variant="outlined"
                onChange={handleChange}
              />
            );
          })}
        <Grid container>
          <Box sx={{ flexGrow: 1 }} />
          <Grid item>
            <Button
              disabled={disabled}
              variant="contained"
              onClick={handleSubmit}
              size="xl"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
