import React, { useState } from "react";
import { generateInitialValues } from "@/lib/generators/generateInitialValues";
import { subscriptionSchema } from "../../schemas/subscription";
import { useFormik } from "formik";
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { ArrowBack, Edit, Euro, Send, VolunteerActivism } from "@mui/icons-material";
import { translate } from "@/lib/translations/translate";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";
import MuiPhoneNumber from "material-ui-phone-number";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import RecurringDonationSuccessModal from "./RecurringDonationSuccessModal";

const RecurringForm = ({ language, handleClick }) => {
  const [isSending, setIsSending] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [customAmount, setCustomAmount] = useState(0);

  const [selectedOption, setSelectedOption] = useState("50");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = object().shape({
    fullName: string()
      .required(translate({ tKey: "helperTexts.requiredFullName", lang: language }))
      .min(
        4,
        translate({ tKey: "helperTexts.fullName", lang: language }) +
          " " +
          translate({ tKey: "helperTexts.cannotBeLess", lang: language }) +
          " 4 " +
          translate({ tKey: "helperTexts.characters", lang: language })
      )
      .max(
        128,
        translate({ tKey: "helperTexts.fullName", lang: language }) +
          " " +
          translate({ tKey: "helperTexts.cannotExceed", lang: language }) +
          " 128 " +
          translate({ tKey: "helperTexts.characters", lang: language })
      ),
    email: string()
      .required(translate({ tKey: "helperTexts.email", lang: language }))
      .email(translate({ tKey: "helperTexts.invalidEmail", lang: language })),
    tel: string()
      .required(translate({ tKey: "helperTexts.tel", lang: language }))
      .matches(/^(\+[0-9]{1,3}\s?)?(\([0-9]{1,}\)\s?)?([0-9]|-|\s){5,}$/, translate({ tKey: "helperTexts.invalidTel", lang: language })),
    address: string()
      .required(translate({ tKey: "helperTexts.requiredAddress", lang: language }))
      .min(
        12,
        translate({ tKey: "helperTexts.address", lang: language }) +
          " " +
          translate({ tKey: "helperTexts.cannotBeLess", lang: language }) +
          " 12 " +
          translate({ tKey: "helperTexts.characters", lang: language })
      )
      .max(
        256,
        translate({ tKey: "helperTexts.address", lang: language }) +
          " " +
          translate({ tKey: "helperTexts.cannotExceed", lang: language }) +
          " 256 " +
          translate({ tKey: "helperTexts.characters", lang: language })
      ),
    iban: string()
      .required(translate({ tKey: "helperTexts.requiredIban", lang: language }))
      .max(
        64,
        translate({ tKey: "helperTexts.iban", lang: language }) +
          " " +
          translate({ tKey: "helperTexts.cannotExceed", lang: language }) +
          " 64 " +
          translate({ tKey: "helperTexts.characters", lang: language })
      ),
    comment: string(),
  });

  const initialValues = generateInitialValues(subscriptionSchema);

  const handleSubmit = async (values) => {
    values.amountAsked = selectedOption === "custom" ? parseInt(customAmount) : parseInt(selectedOption);
    values.iban = values.iban.replace(/\s/g, "");

    setIsSending(true);
    if (values.amountAsked < 5 || isNaN(values.amountAsked)) {
      enqueueSnackbar(translate({ tKey: "donate.donationTooSmall", lang: language }), { variant: "error" });
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch("/api/subscriptions/ibans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(values);
      if (response) {
        const data = await response.json();
        if (data.message === "alreadyExist") {
          enqueueSnackbar(translate({ tKey: "donate.alreadyExist", lang: language }), { variant: "info" });
          setIsSending(false);
        } else {
          setIsOpened(true);
          setTimeout(() => {
            router.push("/");
          }, 5000);
        }
      } else {
        enqueueSnackbar(translate({ tKey: "general.errorOccurred", lang: language }), { variant: "error" });
        setIsSending(false);
      }
    } catch (err) {
      enqueueSnackbar(translate({ tKey: "general.errorOccurred", lang: language }), { variant: "error" });
      setIsSending(false);
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      <RecurringDonationSuccessModal opened={isOpened} language={language} />
      <Box sx={{ marginTop: "-1rem", textAlign: "left" }}>
        <Button startIcon={<ArrowBack />} onClick={() => handleClick("main")}>
          {translate({ tKey: "general.back", lang: language })}
        </Button>
      </Box>
      <Typography> {translate({ tKey: "donate.amountOfRecurring", lang: language })}</Typography>
      <FormControl>
        <Grid container mb={2}>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              disabled={isSending}
              control={<Checkbox checked={selectedOption === "20"} onChange={handleRadioChange} value={"20"} />}
              label={
                <Box sx={{ display: "flex", alignItems: "center", textAlign: "right" }}>
                  <Typography variant='h6' sx={{ width: "60px", paddingRight: "0.5rem" }}>
                    20
                  </Typography>
                  <Euro fontSize='small' />
                </Box>
              }
              value={20}
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: "1rem",
                padding: "0.4rem 2rem 0.4rem 1.4rem",
                width: "fit-content",
                margin: "1rem",
              }}
            />
            <FormControlLabel
              disabled={isSending}
              control={<Checkbox checked={selectedOption === "50"} onChange={handleRadioChange} value={"50"} />}
              label={
                <Box sx={{ display: "flex", alignItems: "center", textAlign: "right" }}>
                  <Typography variant='h6' sx={{ width: "60px", paddingRight: "0.5rem" }}>
                    50
                  </Typography>
                  <Euro fontSize='small' />
                </Box>
              }
              value={50}
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: "1rem",
                padding: "0.4rem 2rem 0.4rem 1.4rem",
                width: "fit-content",
                margin: "1rem",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              disabled={isSending}
              control={<Checkbox checked={selectedOption === "100"} onChange={handleRadioChange} value={"100"} />}
              label={
                <Box sx={{ display: "flex", alignItems: "center", textAlign: "right" }}>
                  <Typography variant='h6' sx={{ width: "60px", paddingRight: "0.5rem" }}>
                    100
                  </Typography>
                  <Euro fontSize='small' />
                </Box>
              }
              value={100}
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: "1rem",
                padding: "0.4rem 2rem 0.4rem 1.4rem",
                width: "fit-content",
                margin: "1rem",
              }}
            />
            <FormControlLabel
              disabled={isSending}
              sx={{ backgroundColor: "#f0f0f0", borderRadius: "1rem", padding: "0.4rem 2rem 0.4rem 1.4rem", width: "fit-content", margin: 0, margin: "1rem" }}
              control={<Checkbox checked={selectedOption === "custom"} onChange={handleRadioChange} value='custom' />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    type='number'
                    variant='standard'
                    sx={{ width: "60px" }}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    inputProps={{ min: 0 }}
                    InputProps={{
                      sx: {
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        "&.MuiInputBase-root": {
                          backgroundColor: "#f0f0f0",
                        },
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
                  {customAmount === 0 || customAmount === "" ? <Edit fontSize='small' /> : <Euro fontSize='small' />}
                </Box>
              }
              value={customAmount}
            />
          </Grid>
        </Grid>
      </FormControl>
      <Typography>{translate({ tKey: "donate.myInfo", lang: language })}</Typography>
      <Paper sx={{ backgroundColor: "#f0f0f0", marginTop: 2, padding: { md: "2rem 3rem 1.5rem 1rem", xs: "2rem 2rem 1.5rem 0rem" }, borderRadius: "1rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item mt={0.5} xs={12} md={6}>
              <TextField
                fullWidth
                label={translate({ tKey: "general.fullName", lang: language })}
                name={"fullName"}
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.fullName && !!formik.errors.fullName}
                helperText={formik.touched.fullName && formik.errors.fullName}
                disabled={isSending || false}
                autoFocus
              />
            </Grid>
            <Grid item mt={0.5} xs={12} md={6}>
              <MuiPhoneNumber
                type='tel'
                fullWidth
                variant='outlined'
                label={translate({ tKey: "general.tel", lang: language })}
                defaultCountry='fr'
                onlyCountries={["fr", "mc", "ch", "be", "ma"]}
                name={"tel"}
                value={formik.values.tel}
                onChange={(val) => (formik.values.tel = val)}
                error={formik.touched.tel && !!formik.errors.tel}
                helperText={formik.touched.tel && formik.errors.tel}
                disabled={isSending || false}
              />
            </Grid>
            <Grid item mt={0.5} xs={12}>
              <TextField
                fullWidth
                label={"IBAN"}
                name={"iban"}
                value={formik.values.iban
                  .replace(/[^\dA-Z]/g, "")
                  .replace(/(.{4})/g, "$1 ")
                  .trim()}
                onChange={formik.handleChange}
                error={formik.touched.iban && !!formik.errors.iban}
                helperText={formik.touched.iban && formik.errors.iban}
                disabled={isSending || false}
              />
            </Grid>
            <Grid item mt={0.5} xs={12}>
              <TextField
                fullWidth
                label={translate({ tKey: "general.email", lang: language })}
                name={"email"}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                disabled={isSending || false}
              />
            </Grid>
            <Grid item mt={0.5} xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                label={translate({ tKey: "general.address", lang: language })}
                name={"address"}
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && !!formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
                disabled={isSending || false}
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <LoadingButton loadingPosition='end' loading={isSending} type='sumbit' variant='contained' color='secondary' endIcon={<VolunteerActivism />}>
                {translate({ tKey: "donate.monthlyButton", lang: language })}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default RecurringForm;
