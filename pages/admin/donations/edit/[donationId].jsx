import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import { date, number, object, string } from "yup";
import Loading from "@/components/general/Loading";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import { typeOptions } from "@/lib/selectOptions/typeOptions";

// Validation schema using Yup
const validationSchema = object({
  id: string(),
  fullName: string().required("Le nom complet est requis (mettre anonyme si besoin)"),
  email: string().email("Email invalide"),
  amount: number()
    .required("Le montant est requis")
    .test("decimal-places", "Au maximum deux décimales autorisées", (value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value)),
  email: string().email("Invalid email createdAt"),
  type: string().required("Le type de dons est requis"),
  createdAt: date().required("La date du don est requise"),
});

const EditDonationForm = () => {
  const router = useRouter();
  const { donationId } = router.query;

  const [isOpened, setIsOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    id: donationId,
    fullName: "",
    email: "",
    amount: 0,
    email: "",
    type: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        // Make the API call to fetch the donation data based on the ID
        const response = await fetch(`/api/donations/${donationId}`);
        const data = await response.json();

        // Set the initial values based on the fetched data
        setInitialValues({
          id: data.donation._id,
          fullName: data.donation.fullName,
          email: data.donation.email,
          amount: data.donation.amount,
          email: data.donation.email,
          type: data.donation.type,
          createdAt: data.donation.createdAt,
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchDonation function
    fetchDonation();
  }, [donationId]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // Allow reinitialization of form values
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Make the API call to update the donation
        const response = await fetch(`/api/donations/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Redirect to the donation details page after successful update
          router.replace(`/admin/donations`);
        } else {
          // Handle the case when the update fails
          console.error("Failed to update donation");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleClose = () => {
    setIsOpened(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    setIsOpened(false);
    try {
      const res = await fetch(`/api/donations/delete?id=` + initialValues.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        router.replace("/admin/donations");
      } else {
        console.log("Une erreur est survenue");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <React.Fragment>
      <ConfirmationModal
        handleDelete={handleDelete}
        opened={isOpened}
        handleClose={handleClose}
        title="Suppression d'un don"
        text='Êtes-vous sur de vouloir supprimer ce don de la base de données?'
      />
      {loading && <Loading />}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ paddingRight: "2rem", maxWidth: "1000px" }}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
                disabled
                name='createdAt'
                value={new Date(values.createdAt).toLocaleDateString()}
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
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
                Enregistrer{" "}
              </Button>
              <Button variant='text' onClick={() => setIsOpened(true)} color='error' sx={{ ml: 3, mt: 2 }}>
                {`Supprimer ce don`}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </React.Fragment>
  );
};

export default EditDonationForm;
