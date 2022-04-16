import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";
import useQuestions from "components/Questions";
import fetchWrapper from "../fetchWrapper";
import theme from "../styles";

function Detail() {
  const location = useLocation();
  const history = useHistory();
  const { slug } = location.state;
  const pageQuestion = useQuestions(slug);
  const pageChoices = pageQuestion.choices;
  const [error, setError] = useState("");
  if (pageChoices) {
    pageChoices.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  const updateVote = (id) => {
    setError("");
    fetchWrapper.get(`/api/choices/${id}/up_vote/`).then(() => {
      history.push(`/results/${slug}`, { slug });
    });
  };

  const listChoice = (item) => {
    return (
      <Box sx={{ width: "100%" }}>
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
    <ThemeProvider theme={theme}>
      <Typography
        variant="h4"
        sx={{ marginBottom: "4px", color: "primary.main" }}
      >
        {pageQuestion.text}
      </Typography>
      {pageChoices ? (
        pageChoices.map((item) => listChoice(item))
      ) : (
        <CircularProgress />
      )}
      <Typography>{error}</Typography>
    </ThemeProvider>
  );
}

export default Detail;
