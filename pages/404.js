import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

//* Default page for 404 errors
const Custom404 = () => {
  return (
    <Box
      sx={{
        margin: "6rem auto 4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Image priority alt='404 Not Found' src='/images/404.svg' height={300} width={800} />
      <Typography variant='h5' sx={{ mt: 4 }}>{`La page que vous recherchez n'existe pas`}</Typography>
      <Link href='/'>
        <Button variant='contained' sx={{ mt: 2 }}>
          {`Retour à l'accueil`}
        </Button>
      </Link>
    </Box>
  );
};

export default Custom404;
