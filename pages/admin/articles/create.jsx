import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { bool, date, object, string } from "yup";
import { ArticleFormik, articleValidationSchema } from "@/schemas/article";
import axios from "axios";

const CreateArticle = () => {
  const router = useRouter();

  const initialValues = {
    title: "",
    content: "",
    imageUrl: "",
    priority: false,
    createdAt: new Date(),
  };

  return (
    <React.Fragment>
      <ArticleFormik>
        {(formik) => (
          <>
            <TextField
              fullWidth
              label='Title'
              name='title'
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && !!formik.errors.title}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              label='Content'
              name='content'
              multiline
              minRows={4}
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && !!formik.errors.content}
              helperText={formik.touched.content && formik.errors.content}
            />
            <TextField
              fullWidth
              label='Image URL'
              name='imageUrl'
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              error={formik.touched.imageUrl && !!formik.errors.imageUrl}
              helperText={formik.touched.imageUrl && formik.errors.imageUrl}
            />
            <TextField
              label='Créé le'
              name='createdAt'
              value={formik.values.createdAt.toLocaleDateString()}
              onChange={formik.handleChange}
              error={formik.touched.createdAt && !!formik.errors.createdAt}
              helperText={formik.touched.createdAt && formik.errors.createdAt}
              disabled // Disable editing for the creation date field
            />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                value={formik.values.priority}
                label='Montrer en priorité'
                name='priority'
                onChange={formik.handleChange}
              />
            </FormGroup>
            <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
              Créer
            </Button>
          </>
        )}
      </ArticleFormik>
    </React.Fragment>
  );
};

export default CreateArticle;
