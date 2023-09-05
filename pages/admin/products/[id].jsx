import { useRouter } from "next/router";
import { ProductFormik } from "@/schemas/productSchema";

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ProductFormik id={id} title="Modification d'un produit" />;
};

export default EditProduct;
