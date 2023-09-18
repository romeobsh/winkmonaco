import { Box, Skeleton, useMediaQuery } from "@mui/material";
import React from "react";

const PaymentLoading = () => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Check if the screen width is less than or equal to 600px

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "auto", width: "18rem", height: "18rem", gap: "0.5rem" }}>
        <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "2.5rem", borderRadius: "10px" }} />
        <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "2.5rem", borderRadius: "10px" }} />
        <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "2.5rem", borderRadius: "10px" }} />
        <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "2.5rem", borderRadius: "10px" }} />
        <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "2.5rem", borderRadius: "10px" }} />
      </Box>
    </React.Fragment>
  );
};

export default PaymentLoading;
