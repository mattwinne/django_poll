import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

function BackButton({ stateCount }) {
  const history = useHistory();
  return (
    <Button
      variant="contained"
      onClick={() => {
        history.push(`/polls`, stateCount ? { stateCount } : 0);
      }}
    >
      Back to Polls
    </Button>
  );
}

BackButton.propTypes = {
  stateCount: PropTypes.number,
};

BackButton.defaultProps = {
  stateCount: 0,
};

export default BackButton;
