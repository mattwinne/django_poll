import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
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
                <Typography fontSize="18px" style={{ marginBlock: "auto" }}>
                  {item.text}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </Box>
    );
  };

  return (
    <Container>
      <Card
        sx={{
          borderRadius: "8px",
          backgroundColor: "#1980e980",
          marginTop: "1px",
          marginBottom: "1px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 1px 12px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Typography
          color="#fff"
          variant="h3"
          style={{
            marginBlock: "auto",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          {pageQuestion.text}
        </Typography>
      </Card>
      {pageChoices ? (
        pageChoices.map((item) => listChoice(item))
      ) : (
        <CircularProgress />
      )}
      <Button
        variant="contained"
        onClick={() => {
          history.push(`/index`, { stateCount });
        }}
      >
        Back to Polls
      </Button>
      <Typography>{error}</Typography>
    </Container>
  );
}

export default Detail;
