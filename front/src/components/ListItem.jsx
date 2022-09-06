import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function ListItem(props) {
  const { item, clickHandler } = props;
  return (
    <Box sx={{ width: "100%" }} key={item.id}>
      <Stack spacing={6}>
        <Card>
          <CardActionArea onClick={() => clickHandler(item.id)}>
            <CardContent>
              <Typography fontSize="18px" style={{ marginBlock: "auto" }}>
                {item.text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </Box>
  );
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  clickHandler: PropTypes.func,
};

ListItem.defaultProps = {
  clickHandler: null
};

export default ListItem;
