import { translate } from "@/lib/translations/translate";
import { Cancel, Check, Favorite, Info, Warning } from "@mui/icons-material";
import { CircularProgress, Collapse, Grid, Typography } from "@mui/material";
import React from "react";

const SearchStatus = ({ subscription, notFound, isSearching, language }) => {
  return (
    <Grid item xs={12} mt={3}>
      <Collapse in={subscription === null && !isSearching && !notFound}>
        <Info sx={{ fontSize: 50 }} color='info' />
        <Typography>{translate({ tKey: "contact.enterIban", lang: language })}</Typography>
      </Collapse>
      <Collapse in={isSearching}>
        <CircularProgress size={50} />
        <Typography>{translate({ tKey: "general.searching", lang: language })}</Typography>
      </Collapse>
      <Collapse in={notFound}>
        <Cancel sx={{ fontSize: 50 }} color='error' />
        <Typography>{translate({ tKey: "contact.notFound", lang: language })}</Typography>
      </Collapse>
      <Collapse in={subscription !== null}>
        {subscription?.status === "pending" && (
          <React.Fragment>
            <Warning sx={{ fontSize: 50 }} color='warning' />
            <Typography color='warning.main'>{translate({ tKey: "contact.pending", lang: language })}</Typography>
            <Typography>{translate({ tKey: "contact.secondaryNewAmountAsked", lang: language })}</Typography>
            <Typography mt={1}>
              {translate({ tKey: "contact.askedAmount", lang: language })} <b>{subscription?.amountAsked}€</b>
            </Typography>
          </React.Fragment>
        )}
        {subscription?.status === "newAmountAsked" && (
          <React.Fragment>
            <Warning sx={{ fontSize: 50 }} color='warning' />
            <Typography color='warning.main'>{translate({ tKey: "contact.newAmountAsked", lang: language })}</Typography>
            <Typography>{translate({ tKey: "contact.secondaryNewAmountAsked", lang: language })}</Typography>
            <Typography mt={1}>
              {translate({ tKey: "contact.currentAmount", lang: language })} <b>{subscription?.amount}€</b> -{" "}
              {translate({ tKey: "contact.askedAmount", lang: language })} <b>{subscription?.amountAsked}€</b>
            </Typography>
          </React.Fragment>
        )}
        {subscription?.status === "requestForCancellation" && (
          <React.Fragment>
            <Warning sx={{ fontSize: 50 }} color='warning' />
            <Typography color='warning.main'>{translate({ tKey: "contact.requestForCancellation", lang: language })}</Typography>
            <Typography>{translate({ tKey: "contact.secondaryRequestForCancellation", lang: language })}</Typography>
            <Typography mt={1}>
              {translate({ tKey: "contact.oldAmount", lang: language })} <b>{subscription?.amount || 0}€</b>
            </Typography>
          </React.Fragment>
        )}
        {subscription?.status === "cancelled" && (
          <React.Fragment>
            <Check sx={{ fontSize: 50 }} color='success' />
            <Typography>{translate({ tKey: "contact.cancelled", lang: language })}</Typography>
            <Typography color='success.main'>{translate({ tKey: "contact.cancelledAdditionalInfo", lang: language })}</Typography>
            <Typography mt={1} sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
              {translate({ tKey: "contact.secondaryCancelled", lang: language })}
              <Favorite sx={{ marginLeft: 1, display: { xs: "none", md: "flex" } }} fontSize='x-small' color='secondary' />
            </Typography>
            <Typography mt={1}>
              {" "}
              {translate({ tKey: "contact.oldAmount", lang: language })} <b>{subscription?.amount}€</b>
            </Typography>
          </React.Fragment>
        )}
        {subscription?.status === "subscribed" && (
          <React.Fragment>
            <Check sx={{ fontSize: 50 }} color='success' />
            <Typography>{translate({ tKey: "contact.subscribed", lang: language })}</Typography>
            <Typography mt={1}>
              {translate({ tKey: "contact.currentAmount", lang: language })} <b>{subscription?.amount}€</b>
            </Typography>
          </React.Fragment>
        )}
      </Collapse>
    </Grid>
  );
};

export default SearchStatus;
