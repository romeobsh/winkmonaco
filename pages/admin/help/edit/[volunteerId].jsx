import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, Grid } from "@mui/material";
import { object, string } from "yup";
import Loading from "@/components/general/Loading";
import ConfirmationModal from "@/components/general/ConfirmationModal";

// Validation schema using Yup
const validationSchema = object({
  id: string(),
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  telephone: string().matches(/^[+]?[0-9]{10,}$/, "Invalid phone number"),
  email: string().email("Invalid email address"),
  job: string(),
  address: string(),
  comment: string(),
});

const EditVolunteerForm = () => {
  const router = useRouter();
  const { volunteerId } = router.query;

  const [isOpened, setIsOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    id: volunteerId,
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    job: "",
    address: "",
    comment: "",
  });

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        // Make the API call to fetch the volunteer data based on the ID
        const response = await fetch(`/api/volunteers/${volunteerId}`);
        const data = await response.json();

        // Set the initial values based on the fetched data
        setInitialValues({
          id: data.volunteer._id,
          firstName: data.volunteer.firstName,
          lastName: data.volunteer.lastName,
          telephone: data.volunteer.telephone,
          email: data.volunteer.email,
          job: data.volunteer.job,
          address: data.volunteer.address,
          comment: data.volunteer.comment,
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchVolunteer function
    fetchVolunteer();
  }, [volunteerId]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // Allow reinitialization of form values
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Make the API call to update the volunteer
        const response = await fetch(`/api/volunteers/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Redirect to the volunteer details page after successful update
          router.replace(`/admin/help`);
        } else {
          // Handle the case when the update fails
          console.error("Failed to update volunteer");
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
      const res = await fetch(`/api/volunteers/delete?id=` + initialValues.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        router.replace("/admin/help");
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
        title="Suppression d'un volontaire"
        text='Êtes-vous sur de vouloir supprimer ce volontaire de la base de données?'
      />
      {loading && <Loading />}
      {!loading && (
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
                Enregistrer{" "}
              </Button>
              <Button variant='text' onClick={() => setIsOpened(true)} color='error' sx={{ ml: 3, mt: 2 }}>
                {`Supprimer ce volontaire`}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </React.Fragment>
  );
};

export default EditVolunteerForm;
