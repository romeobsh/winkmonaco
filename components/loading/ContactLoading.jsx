import { Box, Skeleton, useMediaQuery } from "@mui/material";
import React from "react";

const ContactLoading = () => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Check if the screen width is less than or equal to 600px

  return (
    <React.Fragment>
      <Skeleton animation='wave' variant='circular' width={120} height={120} sx={{ margin: isMobile ? "auto" : "" }} />
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "18rem", gap: isMobile ? "0.5rem" : "" }}>
        <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px" }} />
        <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px" }} />
        <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px" }} />
      </Box>
    </React.Fragment>
  );
};

export default ContactLoading;
