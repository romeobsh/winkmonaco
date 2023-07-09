import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { Grid, Typography } from "@mui/material";
import { generateFormFields } from "./generateFormFields";
import { generateYupSchema } from "./generateYupSchema";
import { generateInitialValues } from "./generateInitialValues";
import { Cancel, Save } from "@mui/icons-material";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import FormLoading from "@/components/loading/FormLoading";
import { LoadingButton } from "@mui/lab";

export const generateFormik = (schema, endpoint, title, id, redirectLink) => {
  const FormikWrapper = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [isOpened, setIsOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [documentId, setDocumentId] = useState("");

    const router = useRouter();

    const validationSchema = generateYupSchema(schema);

    useEffect(() => {
      setInitialValues(generateInitialValues(schema));
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await (await fetch(`/api/${endpoint}/${id === "singleDocument" ? "" : id}`)).json();
          if (data.length > 0 || (typeof data === "object" && data !== {})) {
            setInitialValues(id === "singleDocument" ? data[0] : data);
          }
          setIsLoading(false);
        } catch (error) {
          enqueueSnackbar("Une erreur est survenue lors de la récupération des données", { variant: "error" });
          console.error(error);
        }
      };

      if (id) {
        fetchData();
      } else {
        setIsLoading(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (id === "singleDocument" && initialValues) {
        setDocumentId(initialValues._id);
      } else if (id) {
        setDocumentId(id);
      }
    }, [initialValues]);

    const onConfirm = () => {
      enqueueSnackbar(`Les modifications ont bien été annulées`, { variant: "info" });
      router.push(`/admin/${redirectLink || endpoint}`);
    };

    const handleClose = () => {
      setIsOpened(false);
    };

    const handleSubmit = async (values) => {
      try {
        setIsSending(true);
        // Determine the API endpoint based on the method
        if (documentId === undefined) {
          setDocumentId("");
          id = "";
        }

        const url = `/api/${endpoint}` + (id ? `/${documentId}` : "");

        // Make the API call to update/create the model
        const response = await fetch(url, {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          enqueueSnackbar(`Données enregistrées avec succès`, { variant: "success" });
          router.push(`/admin/${redirectLink || endpoint}`);
        } else {
          // Handle the case when the update/create fails
          enqueueSnackbar(`Une erreur s'est produite lors de l'envoi des données`, { variant: "error" });
          console.error(`Failed to ${id ? "update" : "create"} ${endpoint}`);
          setIsSending(false);
        }
      } catch (error) {
        console.error(error);
        enqueueSnackbar(`Une erreur s'est produite lors de l'envoi des données`, { variant: "error" });
        setIsSending(false);
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
          <Grid container spacing={2} sx={{ width: "100%", maxWidth: "1200px" }}>
            <Grid item xs={12}>
              <Typography variant='h3'>{title}</Typography>
            </Grid>
            {(isLoading || !initialValues) && (
              <Grid item xs={12}>
                <FormLoading />
              </Grid>
            )}
            {!isLoading && initialValues && (
              <React.Fragment>
                {generateFormFields(schema, isSending, formik.values, formik.errors, formik.touched, formik.handleChange)}
                <Grid item xs={12}>
                  <LoadingButton
                    loading={isSending}
                    startIcon={<Save />}
                    type='submit'
                    loadingPosition='start'
                    variant='contained'
                    color='primary'
                    sx={{ mt: 2 }}>
                    Enregistrer{" "}
                  </LoadingButton>
                  <LoadingButton
                    loading={isSending}
                    startIcon={<Cancel />}
                    loadingPosition='start'
                    variant='text'
                    onClick={() => setIsOpened(true)}
                    color='error'
                    sx={{ ml: 3, mt: 2 }}>
                    {`Annuler`}
                  </LoadingButton>
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
