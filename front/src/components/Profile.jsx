import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import fetchWrapper from "../fetchWrapper";

function Profile() {
  const [userName, setUserName] = useState("");
  const [myQuestions, setMyQuestions] = useState([""]);
  const initialFormData = Object.freeze("");
  const [formData, updateFormData] = useState(initialFormData);
  const history = useHistory();
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  useEffect(() => {
    fetchWrapper.get(`/api/users/get_user_profile/`).then((res) => {
      setUserName(res.userName);
      setMyQuestions(res.questions);
    });
  }, []);
  const listQuestion = (item) => {
    return (
      <Box sx={{ width: "100%" }} key={item.id + item.user}>
        <Stack spacing={6}>
          <Card>
            <CardActionArea
              onClick={() =>
                history.push({
                  pathname: `/results/${item.id}`,
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
    );
  };
  function changeUsername() {
    fetchWrapper.patch(`/api/users/change_user_name/`, formData).then((res) => {
      setUserName(res.userName);
    });
  }

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ marginBottom: "4px", color: "primary.main" }}
      >
        Profile Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="left">
        <Grid item>
          <TextField
            fullWidth
            id="outlined-basic"
            label={userName}
            name="userName"
            size="sm"
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            sx={{ height: "58px" }}
            onClick={changeUsername}
          >
            Change Username
          </Button>
        </Grid>
      </Grid>
      <Typography
        variant="h5"
        sx={{ marginTop: "10px", color: "primary.main" }}
      >
        Your Polls
      </Typography>
      {myQuestions.map((item) => listQuestion(item))}
    </Container>
  );
}

export default Profile;
