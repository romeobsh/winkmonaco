import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { object, string } from "yup";
import Loading from "@/components/general/Loading";
import { Translate } from "@mui/icons-material";

// Validation schema using Yup
const validationSchema = object({
  fullName: string().required("Le nom complet est requis"),
  frTel: string().required("Le numéro de téléphone en format français est requis"),
  internationalTel: string().required("Le numéro de téléphone en format international est requis"),
  email: string().email().required("L'email est requis'"),
  profilePic: string().url("URL invalide").required("Image de profil requise"),
});

const AdminContact = () => {
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    id: "",
    fullName: "",
    frTel: "",
    internationalTel: "",
    email: "",
    profilePic: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call to fetch the article data based on the ID
        const response = await fetch(`/api/contact/view`);
        let data = await response.json();
        data = data.data[0] ?? "";
        // Set the initial values based on the fetched data
        setInitialValues({
          id: data._id ?? "",
          fullName: data.fullName ?? "",
          frTel: data.frTel ?? "",
          internationalTel: data.internationalTel ?? "",
          email: data.email ?? "",
          profilePic: data.profilePic ?? "",
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // Allow reinitialization of form values
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Make the API call to update the article
        const response = await fetch(`/api/contact/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Redirect to the article details page after successful update
          alert("Modifications enregistrées");
          setLoading(false);
        } else {
          // Handle the case when the update fails
          alert("Une erreur est survenue");
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <React.Fragment>
      {loading && <Loading />}
      {!loading && (
        <Grid container>
          <Typography variant='h2' sx={{ mb: 2 }}>
            Infos contact
          </Typography>
          <form onSubmit={handleSubmit}>
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
            <TextField
              fullWidth
              margin='normal'
              label={"Email"}
              name='email'
              value={values.email}
              onChange={handleChange}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Téléphone - Format français (06 01 02 03 04)'
              name='frTel'
              value={values.frTel}
              onChange={handleChange}
              error={touched.frTel && !!errors.frTel}
              helperText={touched.frTel && errors.frTel}
            />
            <TextField
              fullWidth
              margin='normal'
              label={
                <React.Fragment>
                  <Translate sx={{ color: "black" }} /> {`Téléphone - Format international (+33 6 01 02 03 04)`}
                </React.Fragment>
              }
              name='internationalTel'
              value={values.internationalTel}
              onChange={handleChange}
              error={touched.internationalTel && !!errors.internationalTel}
              helperText={touched.internationalTel && errors.internationalTel}
            />
            <TextField
              fullWidth
              margin='normal'
              label={"Photo de profil - URL de l'image"}
              name='profilePic'
              value={values.profilePic}
              onChange={handleChange}
              error={touched.profilePic && !!errors.profilePic}
              helperText={touched.profilePic && errors.profilePic}
            />
            <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
              Enregistrer{" "}
            </Button>
          </form>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default AdminContact;
