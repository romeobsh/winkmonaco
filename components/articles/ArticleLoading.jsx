import { Box, Skeleton } from "@mui/material";
import React from "react";

const ArticleLoading = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "2rem", borderRadius: "10px", margin: "2rem auto 0.5rem", width: "65%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "15rem", borderRadius: "10px", margin: "2rem auto", width: "90%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "90%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "60%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "80%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "90%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "50%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "80%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "90%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "0.8rem", borderRadius: "10px", margin: "2.5rem 0 0 auto", width: "10%" }} />
    </Box>
  );
};

export default ArticleLoading;
