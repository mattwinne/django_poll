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
import { useTheme, useThemeUpdate } from "../ThemeContext";
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
  const setTheme = useThemeUpdate();
  const darkTheme = useTheme();
  const [change, setChange] = useState(false);
  const [checked, setChecked] = useState(darkTheme);
  const darkSwitch = (e, val) => {
    if (val == true) {
      localStorage.setItem("darkMode", "true");
      setChecked(true);
      setTheme(true);
      fetchWrapper.patch(`/api/users/change_profile/`, { darkMode: true });
    } else if (val == false) {
      localStorage.setItem("darkMode", "false");
      setChecked(false);
      setTheme(false);
      fetchWrapper.patch(`/api/users/change_profile/`, { darkMode: false });
    }
  };

  useEffect(() => {
    fetchWrapper.get(`/api/users/get_user_profile/`).then((res) => {
      setUserName(res.userName);
      setMyQuestions(res.questions);
    });
  }, [change]);

  function deleteQuestion(id) {
    fetchWrapper.delete(`/api/questions/${id}/`).then(() => {
      setChange(!change);
    });
  }

  const listQuestion = (item) => {
    return (
      <Grid item key={item.id + item.user}>
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
              <Button
                variant="outlined"
                value={item.id}
                sx={{ height: "58px" }}
                onClick={() => {
                  deleteQuestion(item.id);
                }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    );
  };
  function changeUsername() {
    fetchWrapper.patch(`/api/users/change_profile/`, formData).then((res) => {
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
            <Switch checked={checked} onChange={darkSwitch} />
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
