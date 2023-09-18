import { LanguageContext } from "@/contexts/LanguageContext";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "@/lib/handlers/fetchData";
import ProductsPage from "@/components/products/ProductsPage";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { translate } from "@/lib/translations/translate";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData("products", setIsLoading, setProducts);
  }, []);

  return (
    <React.Fragment>
      {/* <ProductsPage loading={isLoading} data={products} language={language} /> */}
      <Box sx={{ maxWidth: { xs: "600px", md: "1000px" }, width: "100%", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
        <Typography mb={6} variant='h5'>
          {translate({ tKey: "general.dev", lang: language })}
        </Typography>
        <Image src='/images/development.svg' priority alt='Development' width={600} height={240} style={{ marginBottom: "3rem" }} />
      </Box>
    </React.Fragment>
  );
};

export default Products;
