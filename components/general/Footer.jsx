import { LanguageContext } from "@/contexts/LanguageContext";
import { translate } from "@/lib/translations/translate";
import { Box, Link, Typography } from "@mui/material";
import React, { useContext } from "react";

const Footer = () => {
  const { language } = useContext(LanguageContext);

  return (
    <Box sx={{ margin: "1rem auto 2rem", justifyContent: "center", textAlign: "center", display: "flex", flexDirection: "column" }}>
      <Link href='/donate' color='text.main'>
        {translate({ tKey: "general.legalNotices", lang: language })}
      </Link>
      <Typography mt={1} variant='body1'>
        Le Patio Palace 41 avenue Hector Otto, 98000 Monaco
      </Typography>
      <Typography mt={0.5} variant='body1'>
        IBAN: MC98 3000 2032 6000 0007 2181 Z94
      </Typography>
      <Typography mt={1} variant='body2'>
        Design: Nathan Huart
      </Typography>
      <Typography variant='body2'>Development: Steven Lucas</Typography>
      <Typography variant='body2'>Wink Monaco © {new Date().getFullYear()}</Typography>
    </Box>
  );
};

export default Footer;
