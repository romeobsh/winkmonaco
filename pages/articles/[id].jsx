import { useRouter } from "next/router";
import Article from "@/components/articles/Article";
import React from "react";

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Article id={id} />;
};

export default ArticlePage;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
