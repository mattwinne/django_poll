import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import PropTypes from "prop-types";
import React from "react";

function ListQuestion(props) {
  const history = useHistory();
  const { item, idx, myQuestions, setMyQuestions } = props;

  return (
    <Grid item key={item.id}>
      <Stack spacing={6}>
        <Card>
          <CardContent>
            <CardActionArea
              onClick={() =>
                history.push({
                  pathname: `/results/${item.id}`,
                  state: { slug: item.id },
                })
              }
            >
              <Typography>{item.text}</Typography>
            </CardActionArea>
            <DeleteButton
              id={item.id}
              idx={idx}
              list={myQuestions}
              setList={setMyQuestions}
              type="questions"
            />
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  );
}

function UserQuestions(props) {
  const { myQuestions, setMyQuestions } = props;
  return (
    <>
      <Typography variant="h5" sx={{ marginTop: "10px", color: "txt" }}>
        Your Polls
      </Typography>
      <Grid container>
        {myQuestions.map((item, idx) => (
          <ListQuestion
            key={item.id}
            item={item}
            idx={idx}
            myQuestions={myQuestions}
            setMyQuestions={setMyQuestions}
          />
        ))}
      </Grid>
    </>
  );
}

UserQuestions.propTypes = {
  myQuestions: PropTypes.array.isRequired,
  setMyQuestions: PropTypes.func.isRequired,
};

ListQuestion.propTypes = {
  item: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  myQuestions: PropTypes.array.isRequired,
  setMyQuestions: PropTypes.func.isRequired,
};

export default UserQuestions;
