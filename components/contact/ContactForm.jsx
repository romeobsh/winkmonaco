import { ArrowBack, Cancel, Check } from "@mui/icons-material";
import { Box, Button, CircularProgress, Collapse, Grid, Paper, Slide, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import Translation from "../general/Translation";
import { debounce } from "lodash";
import IBAN from "iban";
import { TransitionGroup } from "react-transition-group";
import Loading from "../general/Loading";

const ContactForm = ({ language, isLoading, onClick }) => {
  const [iban, setIban] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

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
        setIsSending(true);
        const response = await fetch(`/api/subscriptions/ibans/${iban}`);
        const data = await response.json();
        if (data.message) {
          setNotFound(true);
          setIsSending(false);
        } else {
          setNotFound(false);
          setSubscription(data.subscription);
          setIsSending(false);
        }
      } catch (error) {
        enqueueSnackbar("Une erreur est survenue, réessayez plus tard", { variant: "error" });
        setIsSending(false);
        return null;
      }
    } else {
      setSubscription(null);
    }
  }, 2000); // Debounce time: 1000ms (1 second)

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
      <Paper sx={{ backgroundColor: "#fafafa", borderRadius: "1rem", padding: { xs: "1rem", md: "2rem" } }}>
        <Typography mb={3}>{`Pour retrouver vos informations, veuillez entrer l'IBAN associé à votre don récurrent:`}</Typography>
        <Grid container>
          <Grid item xs={12}>
            <Grid item xs={12} md={6} sx={{ margin: "auto" }}>
              <TextField label='IBAN' value={iban} onChange={handleChange} fullWidth disabled={isSending} />
            </Grid>
            <Grid item xs={12} mt={2}>
              {isSending && (
                <Collapse in={isSending}>
                  <CircularProgress size={50} />
                  <Typography>Searching...</Typography>
                </Collapse>
              )}
              {notFound && (
                <Collapse in={notFound}>
                  <Cancel sx={{ fontSize: 50 }} color='error' />
                  <Typography>Aucun don récurrent associé à cet IBAN</Typography>
                </Collapse>
              )}
              <Collapse in={subscription !== null}>
                {" "}
                <Check sx={{ fontSize: 50 }} color='success' />
                <Typography>Don récurrent associé à cet IBAN trouvé</Typography>
              </Collapse>
            </Grid>
            <Grid item xs={12} mt={3}>
              <Typography variant='h6'>Je souhaite...</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ContactForm;
