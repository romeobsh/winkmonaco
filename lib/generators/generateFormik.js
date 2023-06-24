import React from "react";
import Router from "next/router";
import { useFormik } from "formik";

export const generateFormik = (initialValues, validationSchema, endpoint, id) => {
  const handleSubmit = async (values) => {
    try {
      // Determine the API endpoint based on the method
      const url = `/api/${endpoint}` + (id ? `/${id}` : "");

      // Make the API call to update/create the article
      const response = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Redirect to the article details page after successful update/create
        Router.push(`/admin/${endpoint}`);
      } else {
        // Handle the case when the update/create fails
        console.error(`Failed to ${id ? "update" : "create"} ${endpoint}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const FormikWrapper = ({ children }) => {
    const formik = useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema,
      onSubmit: handleSubmit,
    });

    return <form onSubmit={formik.handleSubmit}>{children(formik)}</form>;
  };

  return FormikWrapper;
};
