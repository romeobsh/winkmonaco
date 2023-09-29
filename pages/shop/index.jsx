import { LanguageContext } from "@/contexts/LanguageContext";
import React, { useContext, useState, useEffect } from "react";
import { fetchData } from "@/lib/handlers/fetchData";
import ProductsPage from "@/components/products/ProductsPage";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData("products", setIsLoading, setProducts);
  }, []);

  return (
    <React.Fragment>
      <ProductsPage loading={isLoading} data={products} language={language} />
    </React.Fragment>
  );
};

export default Products;
