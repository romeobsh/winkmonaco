import { LanguageContext } from "@/contexts/LanguageContext";
import { translate } from "@/lib/translations/translate";
import { Box, Link, Typography } from "@mui/material";
import React, { useContext } from "react";

const Footer = () => {
  const { language } = useContext(LanguageContext);

  return (
    <Box
      sx={{
        margin: "4rem 1rem 2rem",
        justifyContent: "center",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
      }}>
      <Link href='/policies' color='text.main' style={{ fontSize: "0.85rem" }}>
        {translate({ tKey: "general.legalNotices", lang: language })}
      </Link>
      <Typography mt={1} variant='body2' sx={{ fontSize: "0.80rem" }}>
        {`Le Patio Palace 41 avenue Hector Otto,`}
        <br /> 98000 Monaco
      </Typography>
      <Typography
        mt={0.5}
        variant='body2'
        sx={{
          "@media (max-width: 960px)": {
            pointerEvents: "none",
          },
          fontSize: "0.80rem",
        }}>
        IBAN: MC98 3000 2032 6000 0007 2181 Z94
      </Typography>
      <Typography mt={1} variant='body2' sx={{ fontSize: "0.80rem" }}>
        Design: Nathan Huart
      </Typography>
      <Typography variant='body2' sx={{ fontSize: "0.80rem" }}>
        Development: Steven Lucas
      </Typography>
      <Typography variant='body2' sx={{ fontSize: "0.80rem" }}>
        Wink Monaco © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
