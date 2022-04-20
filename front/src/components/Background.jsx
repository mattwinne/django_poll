import { Card, CardMedia, Grid } from "@mui/material";
import React from "react";

export default function Background() {
  return (
    <Grid container position="absolute">
      <Grid item xs={48} sm={24} md={12}>
        <Card variant="basic" sx={{ marginTop: "-2px" }}>
          <CardMedia
            image="https://source.unsplash.com/oZuBNC-6E2s"
            title="Image title"
          />
        </Card>
      </Grid>
    </Grid>
  );
}
