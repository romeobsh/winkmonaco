import { Box, Skeleton } from "@mui/material";
import React from "react";

const ContactFormLoading = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "2rem auto 0.5rem", width: "80%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "2rem", borderRadius: "10px", margin: "0.5rem auto", width: "70%" }} />
      <Skeleton animation='wave' variant='circular' height={60} width={60} sx={{ fontSize: "1rem", margin: "2rem auto 0.5rem" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "60%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "70%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "40%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "6rem", borderRadius: "10px", margin: "2rem auto", width: "60%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "2rem", borderRadius: "10px", margin: "0.5rem auto", width: "20%" }} />
    </Box>
  );
};

export default ContactFormLoading;
