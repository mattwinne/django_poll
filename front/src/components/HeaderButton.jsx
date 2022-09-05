import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

function HeaderButton(props) {
  const { text, clickHandler } = props;
  const history = useHistory();
  const url = text.toLowerCase();
  return (
    <Button
      variant="default"
      sx={{ marginTop: "5px" }}
      onClick={() =>
        clickHandler
          ? clickHandler()
          : history.push(`/${url}`, { stateCount: 0 })
      }
    >
      {text}
    </Button>
  );
}

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
};

HeaderButton.defaultProps = {
  clickHandler: null,
};

export default HeaderButton;
