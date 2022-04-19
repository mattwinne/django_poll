import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { fetchWrapper, header } from "../fetchWrapper";
import  {useAuth}  from "../use-auth"
import React, { useState } from "react";

export default function SignUp() {
  const history = useHistory();
  const auth = useAuth();
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
        fetchWrapper
          .post(`/api/token/`, {
            email: formData.email,
            password: formData.password,
          })
          .then((res) => {
            localStorage.setItem("access_token", res.access);
            localStorage.setItem("refresh_token", res.refresh);
            header.Authorization = `JWT ${localStorage.getItem(
              "access_token"
            )}`;
            auth.signin();
            history.push("/index");
          });
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }} />
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
  );
}
