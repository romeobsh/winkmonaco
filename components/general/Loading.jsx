import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
      <CircularProgress
        size={100}
        sx={{ position: "absolute", top: "45%", left: "calc(50% - 50px)", transform: "translate(-50%, -50%)", WebkitTransform: "translate(-50%, -50%)" }}
      />
    </Box>
  );
};

export default Loading;
