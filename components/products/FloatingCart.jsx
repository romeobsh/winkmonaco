import React, { useEffect, useState } from 'react';
import { Badge, Fab, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '@/contexts/CartContext';
import { translate } from '@/lib/translations/translate';
import Link from 'next/link';

const FloatingCart = ({ language }) => {
  const { cart } = useCart();
  const [bounce, setBounce] = useState(false);

  // Calculate the total quantity of items in the cart
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (totalItems > 0) {
      setBounce(true);
      // Remove the animation class after it's completed
      const timer = setTimeout(() => setBounce(false), 500); // Duration of your animation
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <Link href='/shop/cart'>
      <Fab variant='extended' color='primary' sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
        <Typography variant='body1' sx={{ color: '#fff' }}>
          {translate({ tKey: 'shop.fab', lang: language })}
        </Typography>
        <Badge
          badgeContent={totalItems}
          max={9}
          color='secondary'
          overlap='circular'
          sx={{
            '@keyframes bounce': {
              '0%, 100%': {
                transform: 'scale(1)',
              },
              '50%': {
                transform: 'scale(1.25)',
              },
            },
            animation: bounce ? 'bounce 0.3s linear' : 'none', // Apply the animation conditionally
          }}
        >
          <ShoppingCart sx={{ color: '#fff', marginLeft: 1, animation: 'none' }} />
        </Badge>
      </Fab>
    </Link>
  );
};

export default FloatingCart;
