import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
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
    const percent = parseInt((parseInt(result.votes, 10) / total) * 100, 10);
    let firstResultLine = "";
    if (percent === 0) {
      firstResultLine = `${result.text} ${result.votes}`;
    }

    return (
      <div key={result.id}>
        <Box position="relative">
          <Stack spacing={0} position="absolute" sx={{ width: `100%` }}>
            <Card>
              <CardContent>
                <Typography
                  style={{ marginBlock: "auto" }}
                >
                  {firstResultLine}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>
        <Box sx={{ width: `${percent}%` }}>
          <Stack spacing={0}>
            <Card
              sx={{
                borderRadius: "8px",
                backgroundColor: "primary.main",
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
              <CardContent>
                <Grid container style={{ marginBlock: "auto" }}>
                  <Grid item>
                    <Typography>
                      {result.text}
                    </Typography>
                  </Grid>
                  <Box sx={{ flexGrow: 1 }} />
                  <Grid item>
                    <Typography>
                      {result.votes}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </div>
    );
  };
  return (
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
            {question.text}
          </Typography>
        </Card>
        {results ? (
          results.map((result) => displayResults(result))
        ) : (
          <CircularProgress />
        )}
        <Button
          variant="contained"
          onClick={() => {
            history.push(`/index`, stateCount ? { stateCount } : 0);
          }}
        >
          Back to Polls
        </Button>
      </Box>
    </Container>
  );
}

export default Results;
