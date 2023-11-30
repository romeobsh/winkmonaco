import Product from '@/components/products/Product';
import { useRouter } from 'next/router';
import React from 'react';

const ShopProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Product id={id} />;
};

export default ShopProduct;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
