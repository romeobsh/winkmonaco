import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import { date, number, object, string } from "yup";
import { statusOptions } from "@/lib/selectOptions/statusOptions";

// Validation schema using Yup
const validationSchema = object({
  fullName: string().required("Nom complet requis (mettre anonyme si besoin)"),
  email: string().email("Email invalide"),
  telephone: string().required("Téléphone requis"),
  iban: string().required("IBAN requis"),
  address: string().required("Adresse requise"),
  additional: string(),
  zipCode: string().required("Code postal requis"),
  city: string().required("Ville requise"),
  amount: number()
    .required("Le montant est requis")
    .test("decimal-places", "Au maximum deux décimales autorisées", (value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value)),
  status: string().required("Le statut est requis"),
  comment: string(),
  createdAt: date().required("La date est requise"),
});

const CreateDonation = () => {
  const router = useRouter();

  const [initialValues, setInitialValues] = useState({
    fullName: "",
    email: "",
    telephone: "",
    iban: "",
    address: "",
    additional: "",
    zipCode: "",
    city: "",
    amount: 0,
    status: "demande",
    comment: "",
    createdAt: new Date(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Make the API call to update the article
        const response = await fetch(`/api/subscriptions/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Redirect to the article details page after successful update
          router.replace(`/admin/subscriptions`);
        } else {
          // Handle the case when the update fails
          alert("Une erreur est survenue.");
          console.error("Failed to create donation");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ paddingRight: "1.5rem !important", maxWidth: "1200px" }}>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            margin='normal'
            label='Nom complet'
            name='fullName'
            value={values.fullName}
            onChange={handleChange}
            error={touched.fullName && !!errors.fullName}
            helperText={touched.fullName && errors.fullName}
          />
        </Grid>
        <Grid item sm={12} md={6}>
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
        <Grid item sm={12} md={6}>
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
        <Grid item sm={12} md={12}>
          <TextField
            fullWidth
            margin='normal'
            label='IBAN'
            name='iban'
            value={values.iban}
            onChange={handleChange}
            error={touched.iban && !!errors.iban}
            helperText={touched.iban && errors.iban}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            margin='normal'
            label='Adresse'
            name='address'
            value={values.address}
            onChange={handleChange}
            error={touched.address && !!errors.address}
            helperText={touched.address && errors.address}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            margin='normal'
            label="Complément d'adresse"
            name='additional'
            value={values.additional}
            onChange={handleChange}
            error={touched.additional && !!errors.additional}
            helperText={touched.additional && errors.additional}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            margin='normal'
            label='Code postal'
            name='zipCode'
            value={values.zipCode}
            onChange={handleChange}
            error={touched.zipCode && !!errors.zipCode}
            helperText={touched.zipCode && errors.zipCode}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            margin='normal'
            label='Ville'
            name='city'
            value={values.city}
            onChange={handleChange}
            error={touched.city && !!errors.city}
            helperText={touched.city && errors.city}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            margin='normal'
            type='number'
            label='Montant'
            name='amount'
            value={values.amount}
            onChange={handleChange}
            error={touched.amount && !!errors.amount}
            helperText={touched.amount && errors.amount}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            margin='normal'
            label='Ajouté le'
            name='createdAt'
            value={values.createdAt.toLocaleDateString()}
            disabled
            onChange={handleChange}
            error={touched.createdAt && !!errors.createdAt}
            helperText={touched.createdAt && errors.createdAt}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            select
            fullWidth
            margin='normal'
            label='Statut'
            name='status'
            value={values.status}
            onChange={handleChange}
            error={touched.status && !!errors.status}
            helperText={touched.status && errors.status}>
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item sm={12} md={6}>
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
        <Grid item sm={12} md={12}>
          <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
            Ajouter{" "}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateDonation;
