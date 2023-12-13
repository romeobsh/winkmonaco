import { useCart } from '@/contexts/CartContext';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import { Cancel, Delete } from '@mui/icons-material';
import { Box, Button, Card, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const { language } = useContext(LanguageContext);
  const router = useRouter();

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        {cart.items.map((item) => (
          <React.Fragment key={item.id}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: 0,
                marginBottom: 2,
                borderRadius: '10px',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', padding: '0.5rem 0.5rem 0', alignItems: 'center' }}>
                <Box>
                  <Image
                    unoptimized
                    // layout='responsive'
                    src={item.product.imageUrl}
                    style={{
                      objectFit: 'cover',
                      maxWidth: '159px',
                      borderRadius: '8px',
                    }}
                    alt='Image article'
                    width={106}
                    height={90}
                    priority
                  />
                </Box>
                <Box
                  ml={2}
                  sx={{
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '0 0 0.5rem 0',
                  }}
                >
                  <Typography variant='h6'>{item.product.name}</Typography>
                  <Typography>
                    {item.size !== 'Unique' ? translate({ tKey: 'shop.size', lang: language }) + ' ' + item.size : ''}
                  </Typography>
                  <Typography>Quantité: {item.quantity}</Typography>
                  <Typography variant='h6'>{item.product.price.toLocaleString()}€</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', padding: '1rem', alignItems: 'center' }}>
                <IconButton size='large' color='secondary'>
                  <Cancel fontSize='large' color='secondary' />
                </IconButton>
              </Box>
            </Card>
          </React.Fragment>
        ))}
      </Grid>
      <Grid item xs={12} md={6} sx={{ margin: 'auto', flexDirection: 'column', display: 'flex' }}>
        <Typography variant='h5' mb={3}>
          Total:{' '}
          <b>
            {cart.items
              .reduce((acc, obj) => {
                return acc + obj.product.price * obj.quantity;
              }, 0)
              .toLocaleString()}
            €
          </b>
        </Typography>
        <Button variant='text' sx={{ width: '250px', margin: 'auto' }} onClick={() => router.push('/shop')}>
          {translate({ tKey: 'shop.emptyCartButton', lang: language })}
        </Button>
        <Button variant='contained' sx={{ width: '250px', margin: 'auto' }}>
          Paiement
        </Button>
      </Grid>
    </Grid>
  );
};

export default Cart;

// id: "64e67eb62684a2bbb933aef0"
// quantity: 1
// size: "S"
// product:
// imageUrl:"https://drive.google.com/uc?export=view&id=1u1rZ76BHpQfXvXObgu-knqnkvrws6aNW"
// name: "DANCE"
// price: 987
