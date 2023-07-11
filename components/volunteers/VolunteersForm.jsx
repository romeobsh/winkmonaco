import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { ArrowBack, Send } from "@mui/icons-material";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import VolunteersLoading from "./VolunteersLoading";
import { generateYupSchema } from "@/lib/generators/generateYupSchema";
import { volunteerSchema } from "@/schemas/volunteer";
import { generateInitialValues } from "@/lib/generators/generateInitialValues";
import { useFormik } from "formik";
import MuiPhoneNumber from "material-ui-phone-number";
import { LoadingButton } from "@mui/lab";

const VolunteersForm = ({ loading, data, language, onClick }) => {
  const [isSending, setIsSending] = useState(false);

  const validationSchema = generateYupSchema(volunteerSchema);
  const initialValues = generateInitialValues(volunteerSchema);

  if (!data?.isActiveKit) {
    initialValues.address = "Pas d'adresse (kit inactif)";
  }

  const handleSubmit = async (values) => {
    setIsSending(true);

    try {
      // const response = await fetch("/api/volunteers", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // });
      // if (response.ok) {
      console.log("OK");
      // } else {
      //   console.log("PB");
      // }
    } catch (err) {
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
      <Box sx={{ marginTop: "-1rem", textAlign: "left" }}>
        <Button startIcon={<ArrowBack />} onClick={onClick}>
          Retour
        </Button>
      </Box>
      {loading && <VolunteersLoading />}
      {!loading && (
        <React.Fragment>
          <Typography>{renderTextWithLineBreaks(language === "en" ? data?.enFormText : data?.formText)}</Typography>
          <Paper sx={{ backgroundColor: "#fafafa", marginTop: 4, padding: "2rem 3rem 1.5rem 1rem", borderRadius: "1rem" }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item mt={0.5} xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={"Prénom"}
                    name={"firstName"}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && !!formik.errors.firstName}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    disabled={isSending || false}
                    autoFocus
                  />
                </Grid>
                <Grid item mt={0.5} xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={"Nom"}
                    name={"lastName"}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && !!formik.errors.lastName}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    disabled={isSending || false}
                  />
                </Grid>
                <Grid item mt={0.5} xs={12} md={6}>
                  <MuiPhoneNumber
                    type='tel'
                    fullWidth
                    variant='outlined'
                    label={"Téléphone"}
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
                {data?.isActiveKit && (
                  <Grid item mt={0.5} xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={"Profession"}
                      name={"job"}
                      value={formik.values.job}
                      onChange={formik.handleChange}
                      error={formik.touched.job && !!formik.errors.job}
                      helperText={formik.touched.job && formik.errors.job}
                      disabled={isSending || false}
                    />
                  </Grid>
                )}
                <Grid item mt={0.5} xs={12} md={data?.isActiveKit ? 12 : 6}>
                  <TextField
                    fullWidth
                    label={"Email"}
                    name={"email"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    disabled={isSending || false}
                  />
                </Grid>
                {data?.isActiveKit && (
                  <Grid item mt={0.5} xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      label={"Adresse complète"}
                      name={"address"}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={formik.touched.address && !!formik.errors.address}
                      helperText={formik.touched.address && formik.errors.address}
                      disabled={isSending || false}
                    />
                  </Grid>
                )}
                <Grid item mt={0.5} xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    label={"Commentaire"}
                    name={"comment"}
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    error={formik.touched.comment && !!formik.errors.comment}
                    helperText={formik.touched.comment && formik.errors.comment}
                    disabled={isSending || false}
                  />
                </Grid>
                <Grid item xs={12} mt={1}>
                  <LoadingButton loadingPosition='end' loading={isSending} type='sumbit' variant='contained' color='success' endIcon={<Send />}>
                    Je deviens volontaire
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </React.Fragment>
      )}
    </Box>
  );
};

export default VolunteersForm;
