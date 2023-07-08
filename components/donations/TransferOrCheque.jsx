import React from "react";
import { Grid, Paper, Skeleton, Typography } from "@mui/material";
import CopyToClipboardButton from "../ui/CopyToClipboardButton";

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
          <Typography variant='body1' sx={{ display: "flex", position: "relative", alignItems: "center", justifyContent: "center", paddingLeft: "1.5rem" }}>
            {loading ? (
              <Skeleton animation='wave' sx={{ borderRadius: "10px", width: "14rem", margin: "auto" }} />
            ) : (
              <React.Fragment>
                {data?.ownerName || "Nom à renseigner"}
                <CopyToClipboardButton text={data?.ownerName || "Nom à renseigner"} />
              </React.Fragment>
            )}
          </Typography>
          <Typography variant='h6' mt={2} mb={0.5}>
            IBAN{" "}
          </Typography>
          <Typography variant='body1' sx={{ display: "flex", position: "relative", alignItems: "center", justifyContent: "center", paddingLeft: "1.5rem" }}>
            {loading ? (
              <Skeleton animation='wave' sx={{ borderRadius: "10px", width: "24rem", margin: "auto" }} />
            ) : (
              <React.Fragment>
                {data?.iban || "MCXX XXXX XXXX XXXX XXXX XXXX XXXX XXX"} <CopyToClipboardButton text={data?.iban || "MCXX XXXX XXXX XXXX XXXX XXXX XXXX XXX"} />
              </React.Fragment>
            )}
          </Typography>
          <Typography variant='h6' mt={2} mb={0.5}>
            BIC{" "}
          </Typography>
          <Typography variant='body1 ' sx={{ display: "flex", position: "relative", alignItems: "center", justifyContent: "center", paddingLeft: "1.5rem" }}>
            {loading ? (
              <Skeleton animation='wave' sx={{ borderRadius: "10px", width: "12rem", margin: "auto" }} />
            ) : (
              <React.Fragment>
                {data?.bic || "XXXXXXXX"}
                <CopyToClipboardButton text={data?.bic || "XXXXXXXX"} />
              </React.Fragment>
            )}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default React.memo(TransferOrCheque);
