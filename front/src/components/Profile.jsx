import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import fetchWrapper from "../fetchWrapper";
import theme from "../styles";

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
      <Box sx={{ width: "100%" }}>
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
    <ThemeProvider theme={theme}>
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
          <Button onClick={changeUsername} size="xl">
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
    </ThemeProvider>
  );
}

export default Profile;
