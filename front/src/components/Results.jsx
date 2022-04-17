import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import React from "react";
import useQuestions from "components/Questions";

let total = 0;

function Results() {
  const location = useLocation();
  const history = useHistory();
  const { slug, stateCount } = location.state;
  const question = useQuestions(slug);
  const results = question.choices;
  if (results) {
    results.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  const votes = [];
  if (results) {
    for (const [key, value] of Object.entries(results)) {
      const i = parseInt(value.votes, 10);
      votes.push(i);
    }
    total = Math.max(...votes);
  }

  const displayResults = (result) => {
    const resultLine = `${result.text} - ${result.votes}`;
    const percent = parseInt((parseInt(result.votes, 10) / total) * 100, 10);
    if (percent === 0) {
      return (
        <Typography
          key={result.id}
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "15px",
          }}
        >
          {resultLine}
        </Typography>
      );
    }

    return (
      <Box sx={{ width: `${percent}%` }} key={result.id}>
        <Stack spacing={6}>
          <Card
            variant="outlined"
            sx={{
              marginTop: "1px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#b2ebf2",
            }}
          >
            <CardContent>
              <Typography>{resultLine}</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    );
  };
  return (
    <>
      <Typography variant="h4" color="primary">
        {question.text}
      </Typography>
      {results ? (
        results.map((result) => displayResults(result))
      ) : (
        <CircularProgress />
      )}
      <Button
        variant="contained"
        onClick={() => {
          history.push(`/`, stateCount ? {stateCount} : 0);
        }}
      >
        Back to Polls
      </Button>
    </>
  );
}

export default Results;
