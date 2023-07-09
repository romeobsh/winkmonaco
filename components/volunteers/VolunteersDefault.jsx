import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Translation from "../general/Translation";
import Image from "next/image";

const defaultKitContent = ["5 affiches", "30 cartes de visite", "Paire de lunettes 'RP'", "Feuille de route vous expliquant comment nous venir en aide"];

const VolunteersDefault = ({ language }) => (
  <Grid container>
    <Grid item xs={12} lg={6} p={{ xs: 0, lg: "0 2rem" }}>
      <Typography mb={2}>
        {" "}
        <Translation tKey='volunteers.defaultFirstLine' lang={language} />
      </Typography>
      <Typography mb={3}>
        {" "}
        <Translation tKey='volunteers.defaultSecondLine' lang={language} />
      </Typography>
      <Typography variant='body2'>
        {" "}
        <Translation tKey='volunteers.defaultThirdLine' lang={language} />
      </Typography>
    </Grid>
    <Grid item xs={12} lg={6} p={{ xs: 0, lg: "0 2rem" }}>
      <Paper sx={{ backgroundColor: "#fafafa", padding: "1rem", borderRadius: "1rem" }}>
        <Typography variant='h6'>
          <Translation tKey='volunteers.winkKit' lang={language} />
        </Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} lg={6}>
      <Grid item xs={12} lg={6}>
        {" "}
        <Image
          src='/images/volDefault2.webp'
          style={{ objectFit: "cover", borderRadius: "10px 0 0 10px", width: "100%", height: "16rem" }}
          alt='Box packing'
          width={0}
          height={0}
          sizes='100vw'
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        {" "}
        <Image
          src='/images/volDefault1.jpg'
          style={{ objectFit: "cover", borderRadius: "0 0 0 0", width: "100%", height: "16rem" }}
          alt='Box packing'
          width={0}
          height={0}
          sizes='100vw'
        />
      </Grid>
    </Grid>
    <Grid item xs={12} lg={6}></Grid>
    <Grid item xs={12}>
      <Typography mb={2}>
        <Translation tKey='volunteers.defaultFourthLine' />
      </Typography>
      <Typography>
        <Translation tKey='volunteers.defaultFifthLine' />
      </Typography>
    </Grid>
    <Typography variant='body1' sx={{ marginTop: 4 }}>
      <br />
    </Typography>
  </Grid>
);

export default VolunteersDefault;
