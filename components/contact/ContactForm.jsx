import { ArrowBack, Euro, Send } from "@mui/icons-material";
import { Badge, Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, Grid, Paper, Tab, TextField, Typography } from "@mui/material";
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
  const [customAmount, setCustomAmount] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  const [selectedOption, setSelectedOption] = useState("half");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

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

  const handleSubmit = async () => {
    const amountToSend = selectedOption === "half" ? Math.round(subscription?.amount / 2) : customAmount;
    console.log(iban.replace(/\s/g, ""));
    console.log(tab === "0" ? amountToSend : undefined);
    try {
      const response = await fetch(`/api/subscriptions/ibans/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          iban: iban.replace(/\s/g, ""),
          amount: tab === "0" ? amountToSend : undefined,
        }),
      });
      const data = await response.json();
      // Handle the response as needed...
    } catch (error) {
      // Handle error
    }
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
                    <FormControl sx={{ flexDirection: "row", gap: "2rem" }}>
                      <Badge
                        badgeContent={"50%"}
                        sx={{
                          display: subscription?.status !== "cancelled" ? "flex" : "hidden",
                          "& .MuiBadge-badge": {
                            color: "white",
                            backgroundColor: "primary.main",
                          },
                        }}>
                        <FormControlLabel
                          control={<Checkbox checked={selectedOption === "half"} onChange={handleRadioChange} value='half' />}
                          label={
                            <Typography variant='h6' sx={{ display: "flex", alignItems: "center" }}>
                              {subscription?.amount
                                ? Math.round(subscription?.amount / 2)
                                : subscription?.amountAsked
                                ? Math.round(subscription?.amountAsked / 2)
                                : 10}
                              <Euro fontSize='small' />
                            </Typography>
                          }
                          value={
                            subscription?.amount
                              ? Math.round(subscription?.amount / 2)
                              : subscription?.amountAsked
                              ? Math.round(subscription?.amountAsked / 2)
                              : 10
                          }
                          sx={{
                            backgroundColor: "white",
                            borderRadius: "1rem",
                            padding: "0.4rem 2rem 0.4rem 1.4rem",
                            width: "fit-content",
                            margin: 0,
                          }}
                        />
                      </Badge>
                      <FormControlLabel
                        sx={{ backgroundColor: "white", borderRadius: "1rem", padding: "0.4rem 2rem 0.4rem 1.4rem", width: "fit-content", margin: 0 }}
                        control={<Checkbox checked={selectedOption === "custom"} onChange={handleRadioChange} value='custom' />}
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              type='number'
                              variant='standard'
                              sx={{ width: "60px" }}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              InputProps={{
                                sx: {
                                  fontSize: "1.2rem",
                                  fontWeight: 600,
                                  "& input[type=number]": {
                                    MozAppearance: "textfield",
                                  },
                                  "& input[type=number]::-webkit-outer-spin-button": {
                                    WebkitAppearance: "none",
                                    margin: 0,
                                  },
                                  "& input[type=number]::-webkit-inner-spin-button": {
                                    WebkitAppearance: "none",
                                    margin: 0,
                                  },
                                },
                              }}
                            />
                            <Euro fontSize='small' />
                          </Box>
                        }
                        value={customAmount}
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
              <LoadingButton variant='contained' endIcon={<Send />} disabled={subscription === null} onClick={handleSubmit}>
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
