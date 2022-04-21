import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Stack,
  Switch,
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

  const darkSwitch = (e, val) => {
    console.log(val);
  };

  useEffect(() => {
    fetchWrapper.get(`/api/users/get_user_profile/`).then((res) => {
      setUserName(res.userName);
      setMyQuestions(res.questions);
    });
  }, []);
  const listQuestion = (item) => {
    return (
      <Grid item key={item.id + item.user}>
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
                <Typography color="txt">{item.text}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </Grid>
    );
  };
  function changeUsername() {
    fetchWrapper.patch(`/api/users/change_user_name/`, formData).then((res) => {
      setUserName(res.userName);
    });
  }

  return (
    <Container>
      <Box position="relative" width="100%">
        <Typography variant="h4" sx={{ marginBottom: "4px", color: "txt" }}>
          Profile Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h6" color="txt" sx={{ marginTop: "10px" }}>
              Username
            </Typography>
          </Grid>
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
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h6" color="txt" sx={{ marginTop: "10px" }}>
              Dark Mode
            </Typography>
          </Grid>
          <Grid item>
            <Switch onChange={darkSwitch} />
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ marginTop: "10px", color: "txt" }}>
          Your Polls
        </Typography>
        <Grid container>{myQuestions.map((item) => listQuestion(item))}</Grid>
      </Box>
    </Container>
  );
}

export default Profile;
