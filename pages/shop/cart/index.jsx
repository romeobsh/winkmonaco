import EmptyCart from '@/components/products/EmptyCart';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import React from 'react';

const Cart = () => {
  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.cart', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
    </React.Fragment>
  );
};

export default Cart;
