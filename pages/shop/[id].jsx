import Product from '@/components/products/Product';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const ShopProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.shop', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Product id={id} />
    </React.Fragment>
  );
};

export default ShopProduct;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
