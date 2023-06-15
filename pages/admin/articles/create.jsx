import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { bool, object, string } from "yup";

// Validation schema using Yup
const validationSchema = object({
  title: string().required("Title is required"),
  content: string().required("Content is required"),
  imageUrl: string().url("Invalid URL").required("Image URL is required"),
  priority: bool().required("Priority is required"),
});

const CreateArticle = () => {
  const router = useRouter();

  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    imageUrl: "",
    priority: false,
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Make the API call to update the article
        const response = await fetch(`/api/articles/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Redirect to the article details page after successful update
          router.replace(`/admin/articles`);
        } else {
          // Handle the case when the update fails
          console.error("Failed to create article");
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
        <TextField
          fullWidth
          margin='normal'
          label='Title'
          name='title'
          value={values.title}
          onChange={handleChange}
          error={touched.title && !!errors.title}
          helperText={touched.title && errors.title}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Content'
          name='content'
          multiline
          minRows={4}
          value={values.content}
          onChange={handleChange}
          error={touched.content && !!errors.content}
          helperText={touched.content && errors.content}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Image URL'
          name='imageUrl'
          value={values.imageUrl}
          onChange={handleChange}
          error={touched.imageUrl && !!errors.imageUrl}
          helperText={touched.imageUrl && errors.imageUrl}
        />
        <FormGroup>
          <FormControlLabel control={<Checkbox />} value={values.priority} label='Montrer en priorité' name='priority' onChange={handleChange} />
        </FormGroup>
        <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
          Créer{" "}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default CreateArticle;
