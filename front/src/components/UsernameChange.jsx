import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import fetchWrapper from "../fetchWrapper";
import PropTypes from "prop-types";

function UsernameChange({ userName, setUserName }) {
  const initialFormData = Object.freeze("");
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  const changeUsername = () => {
    fetchWrapper.patch(`/api/users/change_profile/`, formData).then((res) => {
      setUserName(res.username);
    });
  };
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography
          variant="h6"
          color="txt"
          sx={{
            marginTop: "10px",
          }}
        >
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
          sx={{
            height: "58px",
          }}
          onClick={() => changeUsername()}
        >
          Change Username
        </Button>
      </Grid>
    </Grid>
  );
}

UsernameChange.propTypes = {
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
};

export default UsernameChange;
