import { Box, Container, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import DarkModeSelector from './DarkModeSelector';
import UserQuestions from "./UserQuestions";
import UsernameChange from "./UsernameChange";
import fetchWrapper from "../fetchWrapper";

function Profile() {
  const [userName, setUserName] = useState("");
  const [myQuestions, setMyQuestions] = useState([]);

  useEffect(() => {
    fetchWrapper.get(`/api/users/get_user_profile/`).then((res) => {
      setUserName(res.userName);
      setMyQuestions(res.questions);
    });
  }, []);

  return (
    <Container>
      <Box position="relative" width="100%">
        <Typography variant="h4" sx={{ marginBottom: "4px", color: "txt" }}>
          Profile Dashboard
        </Typography>
        <UsernameChange userName={userName} setUserName={setUserName} />
        <DarkModeSelector />
        <UserQuestions
          myQuestions={myQuestions}
          setMyQuestions={setMyQuestions}
        />
      </Box>
    </Container>
  );
}

export default Profile;
