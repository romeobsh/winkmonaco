import React from "react";

const ShopProduct = () => {
  return <div>ShopProduct</div>;
};

export default ShopProduct;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
