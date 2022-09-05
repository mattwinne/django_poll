import { Card, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function Title({ text }) {
  return (
    <Card>
      <Typography
        variant="h4"
        style={{
          marginBlock: "auto",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        {text}
      </Typography>
    </Card>
  );
}

Title.propTypes = {
  text: PropTypes.string,
};

Title.defaultProps = {
  text: "",
};

export default Title;
