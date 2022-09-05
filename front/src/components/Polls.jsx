import { Box, Button, CircularProgress, Container, Grid } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Title from "./Title";
import fetchWrapper from "../fetchWrapper";
import useQuestions from "components/Questions";

function Polls() {
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

  const questions = useQuestions(`${questionStart}/list_4_questions`);
  const qPerPage = 4;
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

  const questionSelect = (id) => {
    history.push({
      pathname: `/detail/${id}`,
      state: { slug: id, stateCount: questionStart },
    });
  };

  return (
    <Container>
      <Box position="relative" width="100%">
        <Title text="Choose a Poll" />
        {questions.length > 0 ? (
          questions.map((item) => (
            <ListItem key={item.id} item={item} clickHandler={questionSelect} />
          ))
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

export default Polls;
