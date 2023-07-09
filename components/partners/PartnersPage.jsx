import { Box, Typography } from "@mui/material";
import React from "react";
import Translation from "../general/Translation";
import PartnersContent from "./PartnersContent";
import Link from "next/link";

export const PartnersPage = ({ partners, loading, language }) => {
  return (
    <React.Fragment>
      <Box sx={{ maxWidth: "800px", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
        <Typography variant='h2'>
          <Translation tKey='partners.title' lang={language} />
        </Typography>
        <PartnersContent partners={partners} loading={loading} language={language} />
        <Typography variant='body1' sx={{ marginTop: 3 }}>
          <Translation tKey='partners.defaultAd' />
          <Link style={{ textDecoration: "none", color: "#22c6fe", fontWeight: 600 }} href='/contact'>
            <Translation tKey='nav.contact' />
          </Link>{" "}
          !
        </Typography>
      </Box>
    </React.Fragment>
  );
};
