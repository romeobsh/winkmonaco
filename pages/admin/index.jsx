import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Admin = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "8rem auto", width: "calc(100vw - 18rem)", justifyContent: "center", alignItems: "center" }}>
      <Typography variant='h2' align='center'>
        Tableau de bord
      </Typography>
      <Typography variant='body1'>winkmonaco.mc</Typography>
      <Image alt='Icone' src='/icons/chapeau.png' width={400} height={400} />
    </Box>
  );
};

export default Admin;
