import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import fetchWrapper from "../fetchWrapper";
import theme from "../styles";

export default function SignUp() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("Email Address");
  const [usernameError, setUsernameError] = useState("Username");
  const [passwordError, setPasswordError] = useState("Password");

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    setError("");
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    e.preventDefault();
    fetchWrapper
      .post(`/api/user/create/`, {
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
      })
      .then(() => {
        history.push("/login");
      })
      .catch((err) => {
        if (err.email) {
          setEmailError(err.email);
        }
        if (err.userName) {
          setUsernameError(err.userName);
        }
        if (err.password) {
          setPasswordError(err.password);
        }
        if (err.isString) {
          setError(err);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={emailError}
              name="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label={usernameError}
              type="username"
              id="username"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={passwordError}
              type="password"
              id="password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Create Account
            </Button>
          </Box>
        </Box>
        <Typography>{error}</Typography>
      </Container>
    </ThemeProvider>
  );
}
