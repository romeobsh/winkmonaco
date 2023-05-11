import React from "react";

const Shop = ({ products }) => {
  return (
    <React.Fragment>
      <h1>Shop</h1>
    </React.Fragment>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/products/view");
  const products = await res.json();

  return { props: { products: products.data } };
}

export default Shop;
