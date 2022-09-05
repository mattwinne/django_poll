import { Button } from "@mui/material";
import React from "react";
import fetchWrapper from "../fetchWrapper";
import PropTypes from "prop-types";

function DeleteButton(props) {
  const { id, idx, list, setList, type } = props;

  const deleteQuestion = () => {
    fetchWrapper.delete(`/api/${type}/${id}/`).then(() => {
      setList([...list.slice(0, idx), ...list.slice(idx + 1, list.length)]);
    });
  };

  return (
    <Button
      key={id}
      variant="outlined"
      value={id}
      sx={{ height: "58px" }}
      onClick={() => {
        deleteQuestion();
      }}
    >
      Delete
    </Button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  idx: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  setList: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default DeleteButton;
