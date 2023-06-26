import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useFormik } from "formik";
import { Button, Grid, Typography } from "@mui/material";
import { generateFormFields } from "./generateFormFields";
import { generateYupSchema } from "./generateYupSchema";
import { generateInitialValues } from "./generateInitialValues";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import FormLoading from "@/components/loading/FormLoading";

export const generateFormik = (schema, endpoint, title, id) => {
  const FormikWrapper = ({ children }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [initialValues, setInitialValues] = useState({});

    const router = useRouter();

    const validationSchema = generateYupSchema(schema);

    useEffect(() => {
      setInitialValues(generateInitialValues(schema));
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await (await fetch(`/api/${endpoint}/${id === "singleDocument" ? "" : id}`)).json();
          setInitialValues(id === "singleDocument" ? data[0] : data);
          setIsLoading(false);
        } catch (error) {
          alert(error);
          console.error(error);
        }
      };

      if (id) {
        fetchData();
      } else {
        setIsLoading(false);
      }
    }, []);

    const onConfirm = () => {
      router.push(`/admin/${endpoint}`);
    };

    const handleClose = () => {
      setIsOpened(false);
    };

    const handleSubmit = async (values) => {
      try {
        setIsLoading(true);
        // Determine the API endpoint based on the method
        const url = `/api/${endpoint}` + (id ? `/${id}` : "");

        // Make the API call to update/create the model
        const response = await fetch(url, {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Redirect to the admin main page after successful update/create
          Router.push(`/admin/${endpoint}`);
        } else {
          // Handle the case when the update/create fails
          alert("Une erreur s'est produite");
          console.error(`Failed to ${id ? "update" : "create"} ${endpoint}`);
        }
      } catch (error) {
        console.error(error);
        alert(error);
        setIsLoading(false);
      }
    };

    const formik = useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema,
      onSubmit: handleSubmit,
    });

    return (
      <React.Fragment>
        {" "}
        <ConfirmationModal
          onConfirm={onConfirm}
          opened={isOpened}
          handleClose={handleClose}
          title='Annulation'
          text='Êtes-vous sur de vouloir annuler vos modifications?'
          cancelModal
        />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ width: "calc(100vw - 272px)", maxWidth: "1400px" }}>
            <Grid item xs={12}>
              <Typography variant='h2'>{title}</Typography>
            </Grid>
            {isLoading && (
              <Grid item xs={12}>
                <FormLoading />
              </Grid>
            )}
            {!isLoading && initialValues && (
              <React.Fragment>
                {generateFormFields(schema, formik.values, formik.errors, formik.touched, formik.handleChange)}
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
                    Enregistrer{" "}
                  </Button>
                  <Button variant='text' onClick={() => setIsOpened(true)} color='error' sx={{ ml: 3, mt: 2 }}>
                    {`Annuler`}
                  </Button>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
          {children}
        </form>
      </React.Fragment>
    );
  };

  return FormikWrapper;
};
