import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import { date, number, object, string } from "yup";

// Validation schema using Yup
const validationSchema = object({
  fullName: string().required("Nom complet requis (mettre anonyme si besoin)"),
  email: string().email("Email invalide"),
  amount: number()
    .required("Le montant est requis")
    .test("decimal-places", "Au maximum deux décimales autorisées", (value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value)),
  type: string().required("Le type est requis"),
  createdAt: date().required("La date est requise"),
});

const CreateDonation = () => {
  const router = useRouter();

  const [initialValues, setInitialValues] = useState({
    fullName: "",
    email: "",
    amount: 0,
    type: "virement",
    createdAt: new Date(),
  });

  const typeOptions = [
    {
      value: "virement",
      label: "Virement",
    },
    { value: "liquide", label: "Liquide" },
    { value: "cb", label: "CB" },
    { value: "cheque", label: "Chèque" },
    { value: "subscription", label: "Virement (abonnement)" },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Make the API call to update the article
        const response = await fetch(`/api/donations/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Redirect to the article details page after successful update
          router.replace(`/admin/donations`);
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
      <Grid container spacing={2} sx={{ paddingRight: "1.5rem !important" }}>
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
            label='Type'
            name='type'
            value={values.type}
            onChange={handleChange}
            error={touched.type && !!errors.type}
            helperText={touched.type && errors.type}>
            {typeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
