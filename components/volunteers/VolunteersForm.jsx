import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { ArrowBack, Send } from "@mui/icons-material";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import VolunteersLoading from "./VolunteersLoading";
import { volunteerSchema } from "@/schemas/volunteerSchema";
import { generateInitialValues } from "@/lib/generators/generateInitialValues";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import SuccessModal from "../ui/SuccessModal";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import Translation from "../general/Translation";
import { translate } from "@/lib/translations/translate";
import { object, string } from "yup";

const VolunteersForm = ({ loading, data, language, onClick }) => {
  const [isSending, setIsSending] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = object().shape({
    fullName: string()
      .required(translate({ tKey: "helperTexts.requiredFullName", lang: language }))
      .min(
        4,
        translate({ tKey: "helperTexts.fullName", lang: language }) +
          " " +
          translate({ tKey: "helperTexts.cannotBeLess", lang: language }) +
          " 4 " +
          translate({ tKey: "helperTexts.characters", lang: language })
      )
      .max(
        128,
        translate({ tKey: "helperTexts.fullName", lang: language }) +
          " " +
          translate({ tKey: "helperTexts.cannotExceed", lang: language }) +
          " 128 " +
          translate({ tKey: "helperTexts.characters", lang: language })
      ),
    email: string()
      .required(translate({ tKey: "helperTexts.email", lang: language }))
      .email(translate({ tKey: "helperTexts.invalidEmail", lang: language })),
    tel: string()
      .required(translate({ tKey: "helperTexts.tel", lang: language }))
      .matches(/^(\+[0-9]{1,3}\s?)?(\([0-9]{1,}\)\s?)?([0-9]|-|\s){5,}$/, translate({ tKey: "helperTexts.invalidTel", lang: language })),
    address: string()
      .required(translate({ tKey: "helperTexts.requiredAddress", lang: language }))
      .min(
        12,
        translate({ tKey: "helperTexts.address", lang: language }) +
          " " +
          translate({ tKey: "helperTexts.cannotBeLess", lang: language }) +
          " 12 " +
          translate({ tKey: "helperTexts.characters", lang: language })
      )
      .max(
        256,
        translate({ tKey: "helperTexts.address", lang: language }) +
          " " +
          translate({ tKey: "helperTexts.cannotExceed", lang: language }) +
          " 256 " +
          translate({ tKey: "helperTexts.characters", lang: language })
      ),
    job: string().max(
      64,
      translate({ tKey: "helperTexts.job", lang: language }) +
        " " +
        translate({ tKey: "helperTexts.cannotExceed", lang: language }) +
        " 64 " +
        translate({ tKey: "helperTexts.characters", lang: language })
    ),
    comment: string(),
  });

  const initialValues = generateInitialValues(volunteerSchema);

  if (!data?.isActiveKit) {
    initialValues.address = "Pas d'adresse (kit inactif)";
  }

  const handleSubmit = async (values) => {
    setIsSending(true);
    try {
      const response = await fetch("/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setIsOpened(true);
        setTimeout(() => {
          router.push("/");
        }, 2500);
      } else {
        enqueueSnackbar(translate({ tKey: "general.errorOccurred", lang: language }), { variant: "error" });
        setIsSending(false);
      }
    } catch (err) {
      enqueueSnackbar(translate({ tKey: "general.errorOccurred", lang: language }), { variant: "error" });
      setIsSending(false);
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      <Box sx={{ marginTop: "-1rem", textAlign: "left" }}>
        <Button startIcon={<ArrowBack />} onClick={onClick}>
          <Translation tKey='general.back' lang={language} />
        </Button>
      </Box>
      {loading && <VolunteersLoading />}
      {!loading && (
        <React.Fragment>
          <SuccessModal
            opened={isOpened}
            title={translate({ tKey: "general.thanks", lang: language }) + "!"}
            text={translate({ tKey: "volunteers.modalText", lang: language }) + "!"}
          />
          <Typography>{renderTextWithLineBreaks(language === "en" ? data?.enFormText : data?.formText)}</Typography>
          <Paper sx={{ backgroundColor: "#fafafa", marginTop: 4, padding: { md: "2rem 3rem 1.5rem 1rem", xs: "2rem 2rem 1.5rem 0rem" }, borderRadius: "1rem" }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item mt={0.5} xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={translate({ tKey: "general.fullName", lang: language })}
                    name={"fullName"}
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={formik.touched.fullName && !!formik.errors.fullName}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                    disabled={isSending || false}
                    autoFocus
                  />
                </Grid>
                <Grid item mt={0.5} xs={12} md={6}>
                  <TextField
                    type='tel'
                    fullWidth
                    variant='outlined'
                    label={translate({ tKey: "general.tel", lang: language })}
                    name={"tel"}
                    value={formik.values.tel}
                    onChange={(val) => {
                      formik.values.tel = val;
                    }}
                    error={formik.touched.tel && !!formik.errors.tel}
                    helperText={formik.touched.tel && formik.errors.tel}
                    disabled={isSending || false}
                  />
                </Grid>
                {data?.isActiveKit && (
                  <Grid item mt={0.5} xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={translate({ tKey: "general.job", lang: language })}
                      name={"job"}
                      value={formik.values.job}
                      onChange={formik.handleChange}
                      error={formik.touched.job && !!formik.errors.job}
                      helperText={formik.touched.job && formik.errors.job}
                      disabled={isSending || false}
                    />
                  </Grid>
                )}
                <Grid item mt={0.5} xs={12} md={!data?.isActiveKit ? 12 : 6}>
                  <TextField
                    fullWidth
                    label={translate({ tKey: "general.email", lang: language })}
                    name={"email"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    disabled={isSending || false}
                  />
                </Grid>
                {data?.isActiveKit && (
                  <Grid item mt={0.5} xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      label={translate({ tKey: "general.address", lang: language })}
                      name={"address"}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={formik.touched.address && !!formik.errors.address}
                      helperText={formik.touched.address && formik.errors.address}
                      disabled={isSending || false}
                    />
                  </Grid>
                )}
                <Grid item mt={0.5} xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    label={translate({ tKey: "general.comment", lang: language })}
                    name={"comment"}
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    error={formik.touched.comment && !!formik.errors.comment}
                    helperText={formik.touched.comment && formik.errors.comment}
                    disabled={isSending || false}
                  />
                </Grid>
                <Grid item xs={12} mt={1}>
                  <LoadingButton loadingPosition='end' loading={isSending} type='sumbit' variant='contained' color='success' endIcon={<Send />}>
                    {translate({ tKey: "volunteers.iBecomePartner", lang: language })}
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </React.Fragment>
      )}
    </Box>
  );
};

export default VolunteersForm;
