import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import VolunteersLoading from "./VolunteersLoading";
import { generateYupSchema } from "@/lib/generators/generateYupSchema";
import { volunteerSchema } from "@/schemas/volunteer";
import { generateInitialValues } from "@/lib/generators/generateInitialValues";
import { useFormik } from "formik";
import { generateFormFields } from "@/lib/generators/generateFormFields";

const VolunteersForm = ({ loading, data, language, setClicked }) => {
  const [isSending, setIsSending] = useState(false);

  const validationSchema = generateYupSchema(volunteerSchema);
  const initialValues = generateInitialValues(volunteerSchema);

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      <Box sx={{ marginTop: "-1rem", textAlign: "left" }}>
        <Button startIcon={<ArrowBack />} onClick={() => setClicked(false)}>
          Retour
        </Button>
      </Box>
      {loading && <VolunteersLoading />}
      {!loading && (
        <React.Fragment>
          <Typography>{renderTextWithLineBreaks(language === "en" ? data?.enFormText : data?.formText)}</Typography>
          <Paper sx={{ backgroundColor: "#fafafa", marginTop: 4 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    label={"Prénom"}
                    name={"firstName"}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && !!formik.errors.firstName}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    disabled={isSending || false}
                  />
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
