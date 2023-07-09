import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Translation from "../general/Translation";
import Image from "next/image";

const VolunteersDefault = ({ language }) => (
  <Grid container>
    <Grid item xs={12} lg={6} mr={{ xs: 0, lg: 5 }}>
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
    <Grid item xs={12} lg={6}>
      <Paper sx={{ backgroundColor: "#fafafa", padding: "1rem" }}>
        <Typography variant='h6'>
          <Translation tKey='volunteers.winkKit' lang={language} />
        </Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} lg={6}>
      <Grid item xs={12} lg={6}></Grid>
      <Grid item xs={12} lg={6}></Grid>
    </Grid>
    <Grid item xs={12}>
      <Translation tKey='volunteers.defaultFifthLine' />
    </Grid>
    <Typography variant='body1' sx={{ marginTop: 4 }}>
      <br />
    </Typography>
    <Image
      src='/images/partnersDefault.webp'
      style={{ objectFit: "cover", marginTop: "50px", borderRadius: "10px" }}
      alt='Volunteers picture'
      width={600}
      height={300}
    />
  </Grid>
);

export default VolunteersDefault;
