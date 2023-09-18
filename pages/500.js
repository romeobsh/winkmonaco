import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

//* Default page for 500 errors
const Custom500 = () => {
  return (
    <Box
      sx={{
        margin: "6rem auto 4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Image priority alt='500 Server Error' src='/images/500.svg' height={300} width={800} />
      <Typography variant='h5' sx={{ mt: 4 }}>{`Une erreur est survenue côté serveur`}</Typography>
      <Link href='/'>
        <Button variant='contained' sx={{ mt: 2 }}>
          {`Retour à l'accueil`}
        </Button>
      </Link>
    </Box>
  );
};

export default Custom500;
