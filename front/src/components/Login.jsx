import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { fetchWrapper, header } from "../fetchWrapper";

export default function SignIn() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("Password");
  const [emailError, setEmailError] = useState("Email Address");
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    setError("");
    setPasswordError("");
    setEmailError("");

    e.preventDefault();
    fetchWrapper
      .post(`/api/token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.access);
        localStorage.setItem("refresh_token", res.refresh);
        header.Authorization = `JWT ${localStorage.getItem("access_token")}`;
        history.push("/index");
      })
      .catch((err) => {
        if (err.email) {
          setEmailError(err.email);
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
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={emailError}
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Typography>{error}</Typography>
        </Box>
      </Box>
    </Container>
  );
}
