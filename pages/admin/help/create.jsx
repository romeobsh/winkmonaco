import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, FormGroup, FormControlLabel, Checkbox, Grid } from "@mui/material";
import { object, string } from "yup";

// Validation schema using Yup
const validationSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  telephone: string().matches(/^[+]?[0-9]{10,}$/, "Invalid phone number"),
  email: string().email("Invalid email address"),
  job: string(),
  address: string(),
  comment: string(),
});

const AddVolunteer = () => {
  const router = useRouter();

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    job: "",
    address: "",
    comment: "",
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Make the API call to update the volunteer
        const response = await fetch(`/api/volunteers/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Redirect to the help admin page after successful update
          router.replace(`/admin/help`);
        } else {
          // Handle the case when the update fails
          console.error("Failed to create volunteer");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ paddingRight: "2rem", maxWidth: "1000px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin='normal'
              label='Prénom'
              name='firstName'
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin='normal'
              label='Nom de famille'
              name='lastName'
              minRows={4}
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin='normal'
              label='Téléphone'
              name='telephone'
              value={values.telephone}
              onChange={handleChange}
              error={touched.telephone && !!errors.telephone}
              helperText={touched.telephone && errors.telephone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin='normal'
              label='Profession'
              name='job'
              value={values.job}
              onChange={handleChange}
              error={touched.job && !!errors.job}
              helperText={touched.job && errors.job}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin='normal'
              label='Email'
              name='email'
              value={values.email}
              onChange={handleChange}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin='normal'
              label='Addresse complète'
              name='address'
              value={values.address}
              onChange={handleChange}
              error={touched.address && !!errors.address}
              helperText={touched.address && errors.address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin='normal'
              label='Commentaire'
              name='comment'
              value={values.comment}
              onChange={handleChange}
              error={touched.comment && !!errors.comment}
              helperText={touched.comment && errors.comment}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
              Ajouter un volontaire{" "}
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default AddVolunteer;
