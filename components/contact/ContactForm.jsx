import { ArrowBack, Euro, Send } from "@mui/icons-material";
import { Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, Grid, Paper, Tab, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import Translation from "../general/Translation";
import { debounce } from "lodash";
import IBAN from "iban";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import SearchStatus from "./SearchStatus";
import { translate } from "@/lib/translations/translate";

const ContactForm = ({ language, isLoading, onClick }) => {
  const [iban, setIban] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tab, setTab] = useState("0");

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  const handleChange = (event) => {
    let newIban = event.target.value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

    setIban(newIban);
    searchSubscriptionByIban(newIban);
  };

  const searchSubscriptionByIban = debounce(async (iban) => {
    iban = iban.replace(/\s/g, "");

    if (IBAN.isValid(iban)) {
      try {
        setNotFound(false);
        setIsSearching(true);
        const response = await fetch(`/api/subscriptions/ibans/${iban}`);
        const data = await response.json();
        if (data.message) {
          setNotFound(true);
          setIsSearching(false);
        } else {
          setNotFound(false);
          setSubscription(data.subscription);
          console.log(subscription);
          setIsSearching(false);
        }
      } catch (error) {
        enqueueSnackbar("Une erreur est survenue, réessayez plus tard", { variant: "error" });
        setIsSearching(false);
        return null;
      }
    } else {
      setSubscription(null);
    }
  }, 2000); // Debounce time: 2000ms (2 seconds)

  return (
    <Box>
      <Typography variant='h2' mb={2} sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        <Translation tKey='contact.formTitle' lang={language} />
      </Typography>
      <Box sx={{ marginTop: "-1rem", textAlign: "left" }}>
        <Button startIcon={<ArrowBack />} onClick={onClick}>
          <Translation tKey='general.back' lang={language} />
        </Button>
      </Box>
      <Paper sx={{ backgroundColor: "#f0f0f0", borderRadius: "1rem", padding: { xs: "1rem", md: "2rem" } }}>
        <Typography mb={3}>{translate({ tKey: "contact.firstLine", lang: language })}</Typography>
        <Grid container>
          <Grid item xs={12}>
            <Grid item xs={12} md={6} sx={{ margin: "auto" }}>
              <TextField label='IBAN' value={iban} onChange={handleChange} fullWidth disabled={isSearching} />
            </Grid>
            <SearchStatus isSearching={isSearching} subscription={subscription} language={language} notFound={notFound} />
            <Grid item xs={12} mt={3}>
              <Typography variant='h6' mb={2}>
                {translate({ tKey: "contact.iWant", lang: language })}
              </Typography>
              <TabContext value={tab}>
                <TabList onChange={handleChangeTab} TabIndicatorProps={{ style: { backgroundColor: "transparent" } }} centered>
                  <Tab
                    sx={{
                      backgroundColor: tab === "0" ? "white" : "transparent",
                      marginRight: { xs: "0.5rem", md: "2rem" },
                      color: "text.main",
                      borderRadius: "1rem",
                      overflow: "clip",
                      fontWeight: 600,
                      transition: "all 0.5s ease-in-out",
                      "&.Mui-selected": { color: "text.main" },
                    }}
                    label={translate({ tKey: "contact.editDonation", lang: language })}
                    disabled={subscription === null}
                    value='0'
                  />
                  <Tab
                    sx={{
                      backgroundColor: tab === "1" ? "white" : "transparent",
                      marginLeft: { xs: "0.5rem", md: "2rem" },
                      color: "error.main",
                      borderRadius: "1rem",
                      fontWeight: 600,
                      transition: "all 0.5s ease-in-out",
                      "&.Mui-selected": { color: "error.main" },
                    }}
                    label={translate({ tKey: "contact.stopDonation", lang: language })}
                    disabled={subscription === null}
                    value='1'
                  />
                </TabList>
                <Collapse in={subscription !== null}>
                  <TabPanel value='0'>
                    <FormControl sx={{ flexDirection: "row", gap: "1rem" }}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Typography variant='h6' sx={{ display: "flex", alignItems: "center" }}>
                            {Math.round(subscription?.amount / 2)}
                            <Euro fontSize='small' />
                          </Typography>
                        }
                        value={"half"}
                        sx={{ backgroundColor: "white", borderRadius: "1rem", padding: "0.4rem 2rem 0.4rem 1.4rem", width: "fit-content", margin: 0 }}
                      />
                      <FormControlLabel
                        sx={{ backgroundColor: "white", borderRadius: "1rem", padding: "0.4rem 2rem 0.4rem 1.4rem", width: "fit-content", margin: 0 }}
                        control={<Checkbox />}
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              type='number'
                              variant='standard'
                              sx={{ width: "60px" }}
                              InputProps={{
                                sx: {
                                  fontSize: "1.2rem",
                                  fontWeight: 600,
                                  "& input[type=number]": {
                                    "-moz-appearance": "textfield",
                                  },
                                  "& input[type=number]::-webkit-outer-spin-button": {
                                    "-webkit-appearance": "none",
                                    margin: 0,
                                  },
                                  "& input[type=number]::-webkit-inner-spin-button": {
                                    "-webkit-appearance": "none",
                                    margin: 0,
                                  },
                                },
                              }}
                            />
                            <Euro fontSize='small' />
                          </Box>
                        }
                        value={"custom"}
                      />
                    </FormControl>
                  </TabPanel>
                  <TabPanel value='1'>
                    <Typography>{translate({ tKey: "contact.stopFirstLine", lang: language })}</Typography>
                    <Typography>{translate({ tKey: "contact.stopSecondLine", lang: language })}</Typography>
                  </TabPanel>
                </Collapse>
              </TabContext>
            </Grid>
            <Grid item xs={12} mt={2}>
              <LoadingButton variant='contained' endIcon={<Send />} disabled={subscription === null}>
                {translate({ tKey: "general.send", lang: language })}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ContactForm;
