import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useQuestions from "components/Questions";
import fetchWrapper from "../fetchWrapper";

function Index() {
  const location = useLocation();
  const history = useHistory();
  const [questionStart, setQuestionStart] = useState(
    location.state ? location.state.stateCount : 0
  );
  const [nextButton, setNextButton] = useState("Next");

  const [questionCount, SetQuestionCount] = useState(0);

  useEffect(() => {
    fetchWrapper.get(`/api/questions/question_count/`).then((res) => {
      SetQuestionCount(res.count);
    });
  }, []);

  const questions = useQuestions(`${questionStart}/list_5_questions`);
  const qPerPage = 5;
  const qLimit = questionCount - qPerPage;
  const nextQuestions = () => {
    if (questionStart === qLimit) {
      setNextButton("Next");
      setQuestionStart(0);
    } else if (questionStart >= qLimit - qPerPage) {
      setNextButton("Back to start");
      setQuestionStart(qLimit);
    } else if (questionStart < qLimit) {
      setQuestionStart(questionStart + qPerPage);
    }
  };
  const prevQuestions = () => {
    if (questionStart <= qPerPage) {
      setQuestionStart(0);
    } else {
      setQuestionStart(questionStart - qPerPage);
    }
  };
  const listQuestion = (item) => {
    return (
      <Box sx={{ width: "100%" }} key={item.id}>
        <Stack spacing={6}>
          <Card>
            <CardActionArea
              onClick={() =>
                history.push({
                  pathname: `/detail/${item.id}`,
                  state: { slug: item.id, stateCount: questionStart },
                })
              }
            >
              <CardContent>
                <Typography
                  color="txt"
                  fontSize="18px"
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
    <Container>
      <Box position="relative" width="100%">
        <Card>
          <Typography
            variant="h4"
            color="txt"
            style={{
              marginBlock: "auto",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            Choose a Poll
          </Typography>
        </Card>
        {questions.length > 0 ? (
          questions.map((item) => listQuestion(item))
        ) : (
          <CircularProgress />
        )}
        <Grid container>
          <Grid item xs>
            <Button onClick={() => prevQuestions()}>Previous</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => nextQuestions()}>{nextButton}</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Index;
