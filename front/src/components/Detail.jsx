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
import { ThemeProvider } from "@mui/material/styles";
import { useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";
import useQuestions from "components/Questions";
import fetchWrapper from "../fetchWrapper";
import theme from "../styles";

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
                <Typography
                  style={{ marginBlock: "auto" }}
                >
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
    <ThemeProvider theme={theme}>
      <Container>
        <Box position="relative" width="100%">
          <Card>
            <Typography
              variant="h4"
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
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Detail;
