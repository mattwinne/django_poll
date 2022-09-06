import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";
import fetchWrapper from "../fetchWrapper";

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
      <Box sx={{ width: "100%" }} key={choice}>
        <Stack spacing={6}>
          <Card>
            <CardContent>
              <Typography style={{ marginBlock: "auto" }}>{choice}</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    );
  };

  const finish = () => {
    history.push("/polls");
  };
  return (
    <Container>
      <Box position="relative" width="100%">
        <Card
          sx={{
            borderRadius: "8px",
            backgroundColor: "#1980e91a",
            marginTop: "1px",
            marginBottom: "1px",
            height: "100px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 1px 12px rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Typography
            color="primary"
            variant="h4"
            style={{
              marginBlock: "auto",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            {question}
          </Typography>
        </Card>
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
        <Grid container>
          <Grid item>
            <Button variant="contained" onClick={handleSubmit} size="xl">
              Create Choice
            </Button>
          </Grid>
          <Box sx={{ flexGrow: 1 }} />
          <Grid item>
            <Button variant="contained" onClick={finish} size="xl">
              Finish
            </Button>
          </Grid>
        </Grid>

        <Typography>{error}</Typography>
      </Box>
    </Container>
  );
}
