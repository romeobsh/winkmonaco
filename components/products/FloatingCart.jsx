import React from 'react';
import { Badge, Fab, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '@/contexts/CartContext';
import { translate } from '@/lib/translations/translate';
import Link from 'next/link';

const FloatingCart = ({ language }) => {
  const { cart } = useCart();

  return (
    <Link href='/shop/cart'>
      <Fab variant='extended' color='primary' sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
        <Typography variant='body1' sx={{ color: '#fff' }}>
          {translate({ tKey: 'shop.fab', lang: language })}
        </Typography>
        <Badge badgeContent={cart.length} max={9} color='secondary' overlap='circular'>
          <ShoppingCart sx={{ color: '#fff', marginLeft: 1 }} />
        </Badge>
      </Fab>
    </Link>
  );
};

export default FloatingCart;
