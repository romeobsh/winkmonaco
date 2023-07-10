import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Translation from "../general/Translation";
import VolunteersContent from "./VolunteersContent";
import Link from "next/link";

export const VolunteersPage = ({ data, loading, language }) => {
  return (
    <React.Fragment>
      <Box sx={{ maxWidth: { xs: "600px", lg: "1000px" }, width: "100%", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
        <Typography variant='h2' mb={4}>
          <Translation tKey='volunteers.title' lang={language} />
        </Typography>
        <VolunteersContent data={data} loading={loading} language={language} />
        <Typography variant='body1' sx={{ marginTop: 3 }}>
          <Button>
            {" "}
            <Translation tKey='volunteers.button' />
          </Button>
          <Translation tKey='volunteers.defaultAd' />
          <Link style={{ textDecoration: "none", color: "#22c6fe", fontWeight: 600 }} href='/contact'>
            <Translation tKey='nav.contact' />
          </Link>{" "}
          !
        </Typography>
      </Box>
    </React.Fragment>
  );
};
