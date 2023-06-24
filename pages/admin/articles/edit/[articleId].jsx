import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Loading from "@/components/general/Loading";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import { ArticleFormik, articleValidationSchema } from "@/schemas/article";
import { deletionHandler } from "@/lib/handlers/deletionHandler";

const EditArticleForm = () => {
  const router = useRouter();
  const { articleId } = router.query;
  const id = articleId;

  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    _id: articleId,
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
        const { data } = await (await fetch(`/api/articles/${id}`)).json();

        // const { data: response } = ...

        // Set the initial values based on the fetched data
        setInitialValues(data);

        setIsLoading(false);
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
    validationSchema: articleValidationSchema,
    onSubmit: async (values) => {
      try {
        // Make the API call to update the article
        const response = await fetch(`/api/articles/` + initialValues.id, {
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

  const handleDelete = () => deletionHandler(id, "articles", setIsLoading, setIsOpened);

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
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <ArticleFormik id={id} initialValues={initialValues}>
            {({ values, errors, touched, handleChange, handleSubmit } = formik) => (
              <>
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
              </>
            )}
          </ArticleFormik>
        </>
      )}
    </React.Fragment>
  );
};

export default EditArticleForm;
