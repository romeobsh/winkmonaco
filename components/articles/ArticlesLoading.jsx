import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Skeleton } from "@mui/material";
import React from "react";

const ArticlesLoading = () => {
  return (
    <React.Fragment>
      <Grid item xs={12} display='flex' mb={3}>
        <Skeleton variant='text' sx={{ height: "4rem", width: "5rem", marginLeft: { xs: 0, md: 2 } }} />
        <Skeleton variant='text' sx={{ height: "4rem", width: "12rem", marginLeft: 2 }} />
      </Grid>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid key={index} item xs={12} md={6} sx={{ padding: { xs: 0, md: "1rem" } }}>
          <Card sx={{ height: "24rem", borderRadius: "1rem", backgroundColor: "#fafafa" }} elevation={3}>
            <CardActionArea>
              <CardContent sx={{ height: "10rem" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", height: "3.5rem" }}>
                  <Skeleton variant='text' sx={{ height: "2.6rem", width: "14rem" }} />
                  <Skeleton variant='text' sx={{ height: "1.6rem", width: "3rem", mt: 1, ml: 0.5 }} />
                </Box>
                <Box sx={{ height: "6.5rem", maxHeight: "6.5rem" }}>
                  <Skeleton variant='text' sx={{ height: "1rem", mb: 1 }} />
                  <Skeleton variant='text' sx={{ height: "1rem", mb: 1 }} />
                  <Skeleton variant='text' sx={{ height: "1rem", mb: 1 }} />
                  <Skeleton variant='text' sx={{ height: "1rem" }} />
                </Box>
              </CardContent>
              <Box sx={{ height: "14rem", paddingTop: "1rem", position: "relative" }}>
                <CardMedia>
                  <Skeleton variant='rectangular' sx={{ height: "14rem" }} />
                </CardMedia>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Skeleton variant='text' sx={{ width: "20rem", height: "5rem", margin: "auto", borderRadius: "1rem" }} />
      </Grid>
    </React.Fragment>
  );
};

export default ArticlesLoading;
