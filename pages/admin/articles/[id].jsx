import { useRouter } from "next/router";
import { ArticleFormik } from "@/schemas/article";

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ArticleFormik id={id} title="Modification d'un article" />;
};

export default EditArticle;
