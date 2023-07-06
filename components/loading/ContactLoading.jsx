import { Box, Skeleton } from "@mui/material";
import React from "react";

const ContactLoading = () => {
  return (
    <React.Fragment>
      <Skeleton animation='wave' variant='circular' width={120} height={120} />
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "18rem" }}>
        <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px" }} />
        <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px" }} />
        <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px" }} />
      </Box>
    </React.Fragment>
  );
};

export default ContactLoading;
