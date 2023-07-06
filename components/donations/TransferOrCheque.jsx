import React from "react";
import { Grid, Paper, Skeleton, Typography } from "@mui/material";

const TransferOrCheque = ({ data, english, loading }) => {
  return (
    <Grid container sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
      <Grid item xs={6} lg={12}>
        <Typography variant='h6' mb={2}>
          Paiement par <b>virement</b>
        </Typography>
        <Paper sx={{ padding: "1rem 2rem", width: "fit-content", margin: "auto", backgroundColor: "#fafafa", borderRadius: "1rem" }}>
          <Typography variant='h6' mb={0.5}>
            Nom du propriétaire
          </Typography>
          <Typography variant='body1'>
            {loading ? <Skeleton animation='wave' sx={{ borderRadius: "10px", width: "14rem", margin: "auto" }} /> : data?.ownerName || "Nom à renseigner"}
          </Typography>
          <Typography variant='h6' mt={2} mb={0.5}>
            IBAN{" "}
          </Typography>
          <Typography variant='body1'>
            {loading ? (
              <Skeleton animation='wave' sx={{ borderRadius: "10px", width: "24rem", margin: "auto" }} />
            ) : (
              data?.iban || "MCXX XXXX XXXX XXXX XXXX XXXX XXXX XXX"
            )}
          </Typography>
          <Typography variant='h6' mt={2} mb={0.5}>
            BIC{" "}
          </Typography>
          <Typography variant='body1'>
            {loading ? <Skeleton animation='wave' sx={{ borderRadius: "10px", width: "12rem", margin: "auto" }} /> : data?.bic || "XXXXXXXX"}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default React.memo(TransferOrCheque);
