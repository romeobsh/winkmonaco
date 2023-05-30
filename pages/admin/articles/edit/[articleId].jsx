import { useRouter } from "next/router";
import React from "react";

const EditArticle = () => {
  const router = useRouter();

  return <div>EditArticle number {router.query.articleId}</div>;
};

export default EditArticle;
