import React from "react";

const Shop = ({ products }) => {
  return (
    <React.Fragment>
      <h1>Shop</h1>
    </React.Fragment>
  );
};

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL + "/api/products/view");
  const products = await res.json();

  return { props: { products: products.data } };
}

export default Shop;
