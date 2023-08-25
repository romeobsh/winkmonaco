import { Box, Fade, Grid, Typography } from "@mui/material";
import React from "react";
import Translation from "../general/Translation";
import ProductsLoading from "./ProductsLoading";

const ProductsPage = ({ data, loading, language }) => {
  console.log(data);

  const handleClick = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <Fade in={true} timeout={1000}>
      <Box sx={{ maxWidth: { xs: "600px", md: "1200px" }, width: "100%", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
        <Typography variant='h2' mb={3}>
          <Translation tKey='shop.title' lang={language} />
        </Typography>
        <Grid container>
          {loading ? (
            <ProductsLoading />
          ) : !loading && data.length === 0 ? (
            <>Ajouter shop désactivé</>
          ) : (
            <React.Fragment>
              {data.map((product) => (
                <>Products cards</>
              ))}
            </React.Fragment>
          )}
        </Grid>
      </Box>
    </Fade>
  );
};

export default ProductsPage;
