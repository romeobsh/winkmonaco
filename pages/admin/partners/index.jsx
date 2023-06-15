import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import { object, string } from "yup";
import Loading from "@/components/general/Loading";

// Validation schema using Yup
const validationSchema = object({
  firstText: string().required("Le premier texte est requis"),
  enFirstText: string().required("Le premier texte en anglais est requis"),
  imageUrl: string().url("URL invalide").required("Image requise"),
  secondText: string().required("Le second texte est requis"),
  enSecondText: string().required("Le second texte en anglais est requis"),
});

const AdminPartners = () => {
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    id: "",
    firstText: "",
    enFirstText: "",
    imageUrl: "",
    secondText: "",
    enSecondText: "",
  });

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // Make the API call to fetch the article data based on the ID
        const response = await fetch(`/api/partners/view`);
        let data = await response.json();
        data = data.data[0] ?? "";
        // Set the initial values based on the fetched data
        setInitialValues({
          id: data._id ?? "",
          firstText: data.firstText ?? "",
          enFirstText: data.firstText ?? "",
          imageUrl: data.imageUrl ?? "",
          secondText: data.secondText ?? "",
          enSecondText: data.secondText ?? "",
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchPartners function
    fetchPartners();
  }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // Allow reinitialization of form values
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Make the API call to update the article
        const response = await fetch(`/api/partners/update`, {
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
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin='normal'
            label='Text 1 - Français'
            name='firstText'
            multiline
            minRows={4}
            value={values.firstText}
            onChange={handleChange}
            error={touched.firstText && !!errors.firstText}
            helperText={touched.firstText && errors.firstText}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Text 1 - Anglais'
            name='enFirstText'
            multiline
            minRows={4}
            value={values.enFirstText}
            onChange={handleChange}
            error={touched.enFirstText && !!errors.enFirstText}
            helperText={touched.enFirstText && errors.enFirstText}
          />
          <TextField
            fullWidth
            margin='normal'
            label="URL de l'image"
            name='imageUrl'
            value={values.imageUrl}
            onChange={handleChange}
            error={touched.imageUrl && !!errors.imageUrl}
            helperText={touched.imageUrl && errors.imageUrl}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Text 2 - Français'
            name='secondText'
            multiline
            minRows={4}
            value={values.secondText}
            onChange={handleChange}
            error={touched.secondText && !!errors.secondText}
            helperText={touched.secondText && errors.secondText}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Text 2 - Anglais'
            name='enSecondText'
            multiline
            minRows={4}
            value={values.enSecondText}
            onChange={handleChange}
            error={touched.enSecondText && !!errors.enSecondText}
            helperText={touched.enSecondText && errors.enSecondText}
          />
          <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
            Enregistrer{" "}
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default AdminPartners;
