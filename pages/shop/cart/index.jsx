import Cart from '@/components/products/Cart';
import EmptyCart from '@/components/products/EmptyCart';
import { useCart } from '@/contexts/CartContext';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import React, { useContext } from 'react';

const CartPage = () => {
  const { language } = useContext(LanguageContext);
  const { cart } = useCart();

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.cart', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Box
        sx={{
          maxWidth: { xs: '600px', md: '1200px' },
          width: '100%',
          margin: 'auto',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' mb={3}>
          {translate({ tKey: 'nav.cart', lang: language })}
        </Typography>
        {cart.items.length === 0 && <EmptyCart />}
        {cart.items.length > 0 && <Cart />}
      </Box>
    </React.Fragment>
  );
};

export default CartPage;
