import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";
import fetchWrapper from "../fetchWrapper";
import theme from "../styles";

export default function CreateChoices() {
  const history = useHistory();
  const location = useLocation();
  const { slug } = location.state;
  const question = location.state.text;
  const initialFormData = Object.freeze({
    question: "",
  });
  const [error, setError] = useState("");
  const [choices, setChoices] = useState([]);
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    fetchWrapper
      .post(`/api/choices/`, { text: formData.choice, question: slug })
      .then((res) => {
        setChoices(choices.concat(res.text));
      })
      .catch((err) => {
        setError(err.text);
      });
  };

  const displayChoices = (choice) => {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", marginBottom: "15px" }}>
          <Stack spacing={6}>
            <Card>
              <CardContent>
                <Typography key={choice}>{choice}</Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </ThemeProvider>
    );
  };

  const finish = () => {
    history.push("/index");
  };
  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant="h4"
        sx={{ marginBottom: "4px", color: "primary.main" }}
      >
        {question}
      </Typography>
      {choices ? (
        choices.map((choice) => displayChoices(choice))
      ) : (
        <CircularProgress />
      )}
      <TextField
        fullWidth
        id="outlined-basic"
        label="Enter choice here..."
        name="choice"
        variant="outlined"
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} size="xl">
        Create Choice
      </Button>
      <Button onClick={finish} size="xl">
        Finish
      </Button>
      <Typography>{error}</Typography>
    </ThemeProvider>
  );
}
