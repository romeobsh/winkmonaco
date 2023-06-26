import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import Loading from "@/components/general/Loading";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import { ArticleFormik, articleSchema } from "@/schemas/article";
import { deletionHandler } from "@/lib/handlers/deletionHandler";
import { articleInitialValues } from "@/schemas/article";
const EditArticleForm = () => {
  const router = useRouter();
  const { id } = router.query;

  // const handleDelete = () => deletionHandler(id, "articles", setIsLoading, setIsOpened);

  return (
    <React.Fragment>
      <ArticleFormik id={id} title="Modification d'un article"></ArticleFormik>
    </React.Fragment>
  );
};

export default EditArticleForm;
