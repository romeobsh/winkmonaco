import React from "react";
import { bool, object, string } from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { Translate } from "@mui/icons-material";
import Loading from "../general/Loading";
import { useRouter } from "next/router";

// Validation schema using Yup
const validationSchema = object({
  ownerName: string().required("Le nom du titulaire est requis"),
  iban: string().required("L'IBAN est requis"),
  bic: string().required("Le BIC est requis"),
  recipient: string().required("Le nom du destinataire est requis"),
  address: string().required("L'adresse est requise"),
});

const AdminPaymentInfo = () => {
  const router = useRouter();

  const [loadingContent, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    id: "",
    ownerName: "",
    iban: "",
    bic: "",
    recipient: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/donations/paymentInfo/view`);
        let data = await response.json();

        data = data.paymentInfo.length > 0 ? data.paymentInfo[0] : "";
        // Set the initial values based on the fetched data
        setInitialValues({
          id: data._id ?? "",
          ownerName: data.ownerName,
          iban: data.iban,
          bic: data.bic,
          recipient: data.recipient,
          address: data.address,
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
        const response = await fetch(`/api/donations/paymentInfo/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert("Modifications enregistrées");
          router.replace("/admin/donations");
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
      <Typography variant='h2' sx={{ mb: 3 }}>{`Modification des informations de paiement`}</Typography>
      {loadingContent && <Loading />}
      {!loadingContent && (
        <form onSubmit={handleSubmit}>
          <Typography>Virements</Typography>
          <TextField
            fullWidth
            margin='normal'
            label='Titulaire'
            name='ownerName'
            value={values.ownerName}
            onChange={handleChange}
            error={touched.ownerName && !!errors.ownerName}
            helperText={touched.ownerName && errors.ownerName}
          />
          <TextField
            fullWidth
            margin='normal'
            label='IBAN'
            name='iban'
            value={values.iban}
            onChange={handleChange}
            error={touched.iban && !!errors.iban}
            helperText={touched.iban && errors.iban}
          />
          <TextField
            fullWidth
            margin='normal'
            label='BIC'
            name='bic'
            value={values.bic}
            onChange={handleChange}
            error={touched.bic && !!errors.bic}
            helperText={touched.bic && errors.bic}
          />
          <Typography sx={{ mt: 5 }}>Chèques</Typography>
          <TextField
            fullWidth
            margin='normal'
            label={"Destinataire"}
            name='recipient'
            value={values.recipient}
            onChange={handleChange}
            error={touched.recipient && !!errors.recipient}
            helperText={touched.recipient && errors.recipient}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Adresse'
            name='address'
            value={values.address}
            onChange={handleChange}
            error={touched.address && !!errors.address}
            helperText={touched.address && errors.address}
          />
          <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
            Enregistrer{" "}
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default AdminPaymentInfo;
