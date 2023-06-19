import React from "react";
import { bool, object, string } from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { Translate } from "@mui/icons-material";
import Loading from "../general/Loading";

// Validation schema using Yup
const validationSchema = object({
  firstText: string().required("Le premier texte est requis"),
  enFirstText: string().required("Le premier texte en anglais est requis"),
  isActiveKit: bool().required("Le kit doit être défini comme actif ou non"),
  kitContent: string().required("Le contenu du kit doit être renseigné"),
  enKitContent: string().required("Le contenu du kit en anglais doit être renseigné"),
  imageUrl: string().url("URL invalide").required("Image 1 requise"),
  imageUrl2: string().url("URL invalide").required("Image 2 requise"),
  imageUrl3: string().url("URL invalide").required("Image 3 requise"),
  secondText: string().required("Le second texte est requis"),
  enSecondText: string().required("Le second texte en anglais est requis"),
});

const AdminHelpContentForm = () => {
  const [loadingContent, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    id: "",
    firstText: "",
    enFirstText: "",
    isActiveKit: false,
    kitContent: "",
    enKitContent: "",
    imageUrl: "",
    imageUrl2: "",
    imageUrl3: "",
    secondText: "",
    enSecondText: "",
  });

  useEffect(() => {
    const fetchHelpTexts = async () => {
      try {
        const response = await fetch(`/api/helpTexts/view`);
        let data = await response.json();

        data = data.helpContent.length > 0 ? data.helpContent[0] : "";
        // Set the initial values based on the fetched data
        setInitialValues({
          id: data._id,
          firstText: data.firstText,
          enFirstText: data.enFirstText,
          isActiveKit: data.isActiveKit,
          kitContent: data.kitContent,
          enKitContent: data.enKitContent,
          imageUrl: data.imageUrl,
          imageUrl2: data.imageUrl2,
          imageUrl3: data.imageUrl3,
          secondText: data.secondText,
          enSecondText: data.enSecondText,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchHelpTexts function
    fetchHelpTexts();
  }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // Allow reinitialization of form values
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Make the API call to update the article
        const response = await fetch(`/api/helpTexts/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
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
      <Typography variant='h2' sx={{ mb: 3 }}>{`Modifications de la page "Aider autrement"`}</Typography>
      {loadingContent && <Loading />}
      {!loadingContent && (
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
            label={
              <React.Fragment>
                <Translate sx={{ color: "black" }} /> Text 1 - Anglais
              </React.Fragment>
            }
            name='enFirstText'
            multiline
            minRows={4}
            value={values.enFirstText}
            onChange={handleChange}
            error={touched.enFirstText && !!errors.enFirstText}
            helperText={touched.enFirstText && errors.enFirstText}
          />
          <FormGroup sx={{ mt: 3 }}>
            <FormControlLabel
              checked={values.isActiveKit}
              control={<Checkbox />}
              value={values.isActiveKit}
              label='Faire apparaître le kit'
              name='isActiveKit'
              onChange={handleChange}
            />
          </FormGroup>
          <TextField
            fullWidth
            margin='normal'
            label={"Contenu du kit - Séparer les éléments par un point-virgule"}
            name='kitContent'
            value={values.kitContent}
            onChange={handleChange}
            error={touched.kitContent && !!errors.kitContent}
            helperText={touched.kitContent && errors.kitContent}
          />
          <TextField
            fullWidth
            margin='normal'
            label={
              <React.Fragment>
                <Translate sx={{ color: "black" }} /> Contenu du kit - Anglais - Séparer les éléments par un point-virgule
              </React.Fragment>
            }
            name='enKitContent'
            value={values.enKitContent}
            onChange={handleChange}
            error={touched.enKitContent && !!errors.enKitContent}
            helperText={touched.enKitContent && errors.enKitContent}
          />
          <TextField
            sx={{ mt: 5 }}
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
            label="URL de l'image 2"
            name='imageUrl2'
            value={values.imageUrl2}
            onChange={handleChange}
            error={touched.imageUrl2 && !!errors.imageUrl2}
            helperText={touched.imageUrl2 && errors.imageUrl2}
          />
          <TextField
            fullWidth
            margin='normal'
            label="URL de l'image 3"
            name='imageUrl3'
            value={values.imageUrl3}
            onChange={handleChange}
            error={touched.imageUrl3 && !!errors.imageUrl3}
            helperText={touched.imageUrl3 && errors.imageUrl3}
          />
          <TextField
            sx={{ mt: 5 }}
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
            label={
              <React.Fragment>
                <Translate sx={{ color: "black" }} /> Text 2 - Anglais
              </React.Fragment>
            }
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

export default AdminHelpContentForm;
