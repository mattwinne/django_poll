import { Card, CardMedia, Grid } from "@mui/material";
import React from "react";

export default function Background() {
  return (
    <Grid container position="absolute">
      <Grid item>
        <Card
          variant="basic"
          square="true"
          sx={{ backgroundColor: "bg.light" }}
        >
          <CardMedia
          // image="https://source.unsplash.com/oZuBNC-6E2s"
          />
        </Card>
      </Grid>
    </Grid>
  );
}
