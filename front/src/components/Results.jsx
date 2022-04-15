import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import React from "react";
import useQuestions from "components/Questions";
import theme from "../styles";

let total = 0;

function Results() {
  const location = useLocation();
  const { slug } = location.state;
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
        <ThemeProvider theme={theme}>
          <Typography
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "15px",
            }}
          >
            {resultLine}
          </Typography>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: `${percent}%` }}>
          <Stack spacing={6}>
            <Card variant="outlined" sx={{ backgroundColor: "primary.main" }}>
              <CardContent>
                <Typography>{resultLine}</Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </ThemeProvider>
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant="h4"
        sx={{ marginBottom: "4px", color: "primary.main" }}
      >
        {question.text}
      </Typography>
      {results ? (
        results.map((result) => displayResults(result))
      ) : (
        <CircularProgress />
      )}
    </ThemeProvider>
  );
}

export default Results;
