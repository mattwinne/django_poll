import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";
import useQuestions from "components/Questions";
import fetchWrapper from "../fetchWrapper";

function Detail() {
  const location = useLocation();
  const history = useHistory();
  const { slug, stateCount } = location.state;
  const pageQuestion = useQuestions(slug);
  const pageChoices = pageQuestion.choices;
  const [error, setError] = useState("");
  if (pageChoices) {
    pageChoices.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  const updateVote = (id) => {
    setError("");
    fetchWrapper.get(`/api/choices/${id}/up_vote/`).then(() => {
      history.push(`/results/${slug}`, { slug, stateCount });
    });
  };

  const listChoice = (item) => {
    return (
      <Box sx={{ width: "100%" }} key={item.id}>
        <Stack spacing={6}>
          <Card>
            <CardActionArea onClick={() => updateVote(item.id)}>
              <CardContent>
                <Typography>{item.text}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </Box>
    );
  };

  return (
    <>
      <Typography variant="h4" color="primary">
        {pageQuestion.text}
      </Typography>
      {pageChoices ? (
        pageChoices.map((item) => listChoice(item))
      ) : (
        <CircularProgress />
      )}
      <Button
        variant="contained"
        onClick={() => {
          history.push(`/`, { stateCount });
        }}
      >
        Back to Polls
      </Button>
      <Typography>{error}</Typography>
    </>
  );
}

export default Detail;
