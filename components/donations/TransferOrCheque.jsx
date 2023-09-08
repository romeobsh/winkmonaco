import React from "react";
import { Grid, Paper, Skeleton, Typography } from "@mui/material";
import CopyToClipboardButton from "../ui/CopyToClipboardButton";
import Translation from "../general/Translation";

const TransferOrCheque = ({ english, loading, data }) => {
  return (
    <Grid container sx={{ display: "flex", textAlign: "center", maxWidth: "1200px", margin: "auto" }}>
      <Grid item xs={12} xl={6}>
        <Typography variant='h6' mb={2}>
          <Translation tKey='donate.paymentBy' lang={english ? "en" : "fr"} />{" "}
          <span style={{ fontWeight: 700 }}>
            <Translation tKey='donate.bankTransfer' lang={english ? "en" : "fr"} />
          </span>
        </Typography>
        <Paper
          sx={{
            padding: "1rem 2rem",
            width: "fit-content",
            minWidth: { xs: "none", md: "494px" },
            maxWidth: "600px",
            margin: "auto",
            backgroundColor: "#fafafa",
            borderRadius: "1rem",
          }}>
          <Typography variant='h6' mb={0.5}>
            <Translation tKey='donate.ownerName' lang={english ? "en" : "fr"} />
          </Typography>
          <Typography
            variant='body1'
            sx={{ display: "flex", position: "relative", alignItems: "center", justifyContent: "center", paddingLeft: { xs: "2rem", md: "1.5rem" } }}>
            {loading ? (
              <Skeleton animation='wave' sx={{ borderRadius: "10px", width: "14rem", margin: "auto" }} />
            ) : (
              <React.Fragment>
                {data?.ownerName || "Nom à renseigner"}
                <CopyToClipboardButton text={data?.ownerName || "Nom à renseigner"} lang={english ? "en" : "fr"} tKey='general.textCopied' />
              </React.Fragment>
            )}
          </Typography>
          <Typography variant='h6' mt={2} mb={0.5}>
            IBAN{" "}
          </Typography>
          <Typography
            variant='body1'
            sx={{ display: "flex", position: "relative", alignItems: "center", justifyContent: "center", paddingLeft: { xs: "2rem", md: "1.5rem" } }}>
            {loading ? (
              <Skeleton animation='wave' sx={{ borderRadius: "10px", width: "24rem", margin: "auto" }} />
            ) : (
              <React.Fragment>
                {data?.iban || "MCXX XXXX XXXX XXXX XXXX XXXX XXXX XXX"}{" "}
                <CopyToClipboardButton text={data?.iban || "MCXX XXXX XXXX XXXX XXXX XXXX XXXX XXX"} lang={english ? "en" : "fr"} tKey='general.textCopied' />
              </React.Fragment>
            )}
          </Typography>
          <Typography variant='h6' mt={2} mb={0.5}>
            BIC{" "}
          </Typography>
          <Typography
            variant='body1 '
            sx={{ display: "flex", position: "relative", alignItems: "center", justifyContent: "center", paddingLeft: { xs: "2rem", md: "1.5rem" } }}>
            {loading ? (
              <Skeleton animation='wave' sx={{ borderRadius: "10px", width: "12rem", margin: "auto" }} />
            ) : (
              <React.Fragment>
                {data?.bic || "XXXXXXXX"}
                <CopyToClipboardButton text={data?.bic || "XXXXXXXX"} lang={english ? "en" : "fr"} tKey='general.textCopied' />
              </React.Fragment>
            )}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} xl={6}>
        <Typography variant='h6' mb={2} mt={{ xl: 0, xs: 4 }}>
          <Translation tKey='donate.paymentBy' lang={english ? "en" : "fr"} />{" "}
          <span style={{ fontWeight: 700 }}>
            <Translation tKey='donate.cheque' lang={english ? "en" : "fr"} />
          </span>
        </Typography>
        <Paper
          sx={{
            padding: "1rem 2rem",
            width: "fit-content",
            minWidth: { xs: "none", md: "494px" },
            maxWidth: "600px",
            margin: "auto",
            backgroundColor: "#fafafa",
            borderRadius: "1rem",
          }}>
          <Typography variant='h6' mb={0.5}>
            <Translation tKey='donate.recipient' lang={english ? "en" : "fr"} />
          </Typography>
          <Typography variant='body1' sx={{ display: "flex", position: "relative", alignItems: "center", justifyContent: "center" }}>
            {loading ? (
              <Skeleton animation='wave' sx={{ borderRadius: "10px", width: "14rem", margin: "auto" }} />
            ) : (
              <React.Fragment>{data?.recipient || "Nom à renseigner"}</React.Fragment>
            )}
          </Typography>
          <Typography variant='h6' mt={2} mb={0.5}>
            <Translation tKey='donate.address' lang={english ? "en" : "fr"} />
          </Typography>
          <Typography variant='body1' sx={{ display: "flex", position: "relative", alignItems: "center", justifyContent: "center" }}>
            {loading ? (
              <Skeleton animation='wave' sx={{ borderRadius: "10px", width: "24rem", margin: "auto" }} />
            ) : (
              <React.Fragment>{data?.address || "XX Avenue du Poteau, 95000 Jambonneau"} </React.Fragment>
            )}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default React.memo(TransferOrCheque);
