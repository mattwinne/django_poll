import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";
import BackButton from "./BackButton"
import ListItem from "./ListItem";
import Title from "./Title";
import fetchWrapper from "../fetchWrapper";
import useQuestions from "components/Questions";

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

  return (
    <Container>
      <Box position="relative" width="100%">
        <Title text={pageQuestion.text} />
        {pageChoices ? (
          pageChoices.map((item) => (
            <ListItem key={item.id} item={item} clickHandler={updateVote} />
          ))
        ) : (
          <CircularProgress />
        )}
        <BackButton stateCount={stateCount} />
        <Typography>{error}</Typography>
      </Box>
    </Container>
  );
}

export default Detail;
