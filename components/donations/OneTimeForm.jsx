import { translate } from "@/lib/translations/translate";
import { ArrowBack, AttachEmail, CreditCard, Edit, Euro, VolunteerActivism } from "@mui/icons-material";
import { Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TransferOrCheque from "./TransferOrCheque";
import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { object, string } from "yup";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { generateInitialValues } from "@/lib/generators/generateInitialValues";
import { donationSchema } from "@/schemas/donationSchema";
import SuccessModal from "../ui/SuccessModal";

export default function OneTimeForm({ language, handleClick, paymentInfos }) {
  const [isSending, setIsSending] = useState(false);
  const [customAmount, setCustomAmount] = useState(0);

  const [method, setMethod] = useState("");
  const [selectedOption, setSelectedOption] = useState("50");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const router = useRouter();

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
  });

  const initialValues = generateInitialValues(donationSchema);

  const handleSubmit = async (values) => {
    values.amount = selectedOption === "custom" ? parseInt(customAmount) : parseInt(selectedOption);
    values.createdAt = new Date();

    setIsSending(true);

    router.push({
      pathname: "/donate/payment",
      query: values,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      <Box sx={{ marginTop: "-1rem", textAlign: "left" }}>
        <Button startIcon={<ArrowBack />} onClick={() => handleClick("main")}>
          {translate({ tKey: "general.back", lang: language })}
        </Button>
      </Box>
      <Box mb={3}>
        <Typography mb={3}>{translate({ tKey: "donate.choseType", lang: language })}</Typography>
        <Box sx={{ display: "flex", gap: { xs: "1rem", md: " 3rem" }, width: "fit-content", margin: "auto" }}>
          <Button
            onClick={() => setMethod("card")}
            disabled={method === "card"}
            sx={{ borderRadius: "1rem", display: "flex", flexDirection: "column", width: "7.5rem", height: "7.5rem" }}
            variant='contained'
            color='secondary'>
            <Typography variant='body2' color='white' mb={0.6} sx={{ fontWeight: 600 }}>
              {translate({ tKey: "donate.card", lang: language })}
            </Typography>
            <CreditCard fontSize='large' />
          </Button>
          <Button
            onClick={() => setMethod("transferOrCheque")}
            disabled={method === "transferOrCheque"}
            sx={{ borderRadius: "1rem", display: "flex", flexDirection: "column", width: "7.5rem", height: "7.5rem" }}
            variant='contained'
            color='secondary'>
            <Typography color='white' variant='body2' mb={0.6} sx={{ fontWeight: 600 }}>
              {translate({ tKey: "donate.transferOrCheque", lang: language })}
            </Typography>
            <AttachEmail fontSize='large' />
          </Button>
        </Box>
      </Box>
      <Collapse in={method === "card"}>
        <Box>
          <Typography> {translate({ tKey: "donate.amountOfDonation", lang: language })}</Typography>
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
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "1rem",
                    padding: "0.4rem 2rem 0.4rem 1.4rem",
                    width: "fit-content",
                    margin: 0,
                    margin: "1rem",
                  }}
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
          <Paper
            sx={{
              backgroundColor: "#f0f0f0",
              padding: { md: "2rem 3rem 1.5rem 1rem", xs: "2rem 2rem 1.5rem 0rem" },
              maxWidth: "800px",
              margin: "2rem auto",
              borderRadius: "1rem",
            }}>
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
                    {translate({ tKey: "donate.oneTimeButton", lang: language })}
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Collapse>
      <Collapse in={method === "transferOrCheque"}>
        <Box>
          <Typography mt={2} mb={2}>
            {renderTextWithLineBreaks(translate({ tKey: "donate.infoTransferOrCheque", lang: language }))}
          </Typography>
          <TransferOrCheque data={paymentInfos} english={language === "en"} />
        </Box>
      </Collapse>
    </Box>
  );
}
