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
import { useHistory } from "react-router-dom";
import React from "react";
import useQuestions from "components/Questions";
import theme from "../styles";

function Index() {
  const history = useHistory();
  const questionsInList = 5;
  const questions = useQuestions(`${questionsInList}/list_n_questions`);
  const listQuestion = (item) => {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={6}>
            <Card>
              <CardActionArea
                onClick={() =>
                  history.push({
                    pathname: `/detail/${item.id}`,
                    state: { slug: item.id },
                  })
                }
              >
                <CardContent>
                  <Typography>{item.text}</Typography>
                </CardContent>
              </CardActionArea>
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
        Choose a Poll
      </Typography>
      {questions.length > 0 ? (
        questions.map((item) => listQuestion(item))
      ) : (
        <CircularProgress />
      )}
    </ThemeProvider>
  );
}

export default Index;
