import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { object, string, bool } from "yup";
import Loading from "@/components/general/Loading";
import ConfirmationModal from "@/components/general/ConfirmationModal";

// Validation schema using Yup
const validationSchema = object({
  id: string(),
  title: string().required("Title is required"),
  content: string().required("Content is required"),
  imageUrl: string().url("Invalid URL").required("Image URL is required"),
  priority: bool().required("Priority is required"),
});

const EditArticleForm = () => {
  const router = useRouter();
  const { articleId } = router.query;

  const [isOpened, setIsOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    id: articleId,
    title: "",
    content: "",
    imageUrl: "",
    createdAt: "",
    priority: false,
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Make the API call to fetch the article data based on the ID
        const response = await fetch(`/api/articles/${articleId}`);
        const data = await response.json();

        // Set the initial values based on the fetched data
        setInitialValues({
          id: data.article._id,
          title: data.article.title,
          content: data.article.content,
          imageUrl: data.article.imageUrl,
          createdAt: data.article.createdAt,
          priority: data.article.priority,
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchArticle function
    fetchArticle();
  }, [articleId]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // Allow reinitialization of form values
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Make the API call to update the article
        const response = await fetch(`/api/articles/update`, {
          method: "PUT",
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
          console.error("Failed to update article");
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
      const res = await fetch(`/api/articles/delete?id=` + initialValues.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        router.replace("/admin/articles");
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
        title="Suppression d'un article"
        text='Êtes-vous sur de vouloir supprimer cet article?'
      />
      {loading && <Loading />}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin='normal'
            label='Id'
            name='id'
            value={values.id}
            onChange={handleChange}
            error={touched.id && !!errors.id}
            helperText={touched.id && errors.id}
            disabled
          />
          <TextField
            fullWidth
            margin='normal'
            label='Titre'
            name='title'
            value={values.title}
            onChange={handleChange}
            error={touched.title && !!errors.title}
            helperText={touched.title && errors.title}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Contenu'
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
            label='Créé le'
            name='createdAt'
            value={new Date(values.createdAt).toLocaleDateString()}
            disabled // Disable editing for the creation date field
          />
          <FormGroup>
            <FormControlLabel
              checked={values.priority}
              control={<Checkbox />}
              value={values.priority}
              label='Montrer en priorité'
              name='priority'
              onChange={handleChange}
            />
          </FormGroup>
          <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
            Enregistrer{" "}
          </Button>
          <Button variant='text' onClick={() => setIsOpened(true)} color='error' sx={{ ml: 3, mt: 2 }}>
            {`Supprimer l'article`}
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default EditArticleForm;
