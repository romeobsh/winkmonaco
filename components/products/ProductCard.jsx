import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { translate } from '@/lib/translations/translate';
import { useRouter } from 'next/router';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export const ProductCard = ({ product, language }) => {
  const router = useRouter();
  const { dispatch, cart } = useCart();

  const defaultSize = product.sizes?.split(';')[0];
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product._id,
        product: {
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
        },
        size: selectedSize,
        quantity: 1,
      },
    });

    // console.log(cart);
  };

  const hasMultipleSizes = product.sizes && product.sizes.split(';').length > 1;

  return (
    <Grid item xs={12} md={router.pathname === '/' ? 12 : 6} sx={{ padding: { xs: '0.5rem', md: '1rem' } }}>
      <Card sx={{ height: '25.5rem', borderRadius: '1rem', backgroundColor: '#fff' }} elevation={3}>
        <CardActionArea onClick={() => router.push('/shop/' + product._id)}>
          <Box sx={{ height: '14rem', position: 'relative' }}>
            <CardMedia component='img' image={product.imageUrl} alt='Image' sx={{ height: '100%' }} />
          </Box>
          <CardContent sx={{ height: '11.5rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontWeight: 600,
                  textAlign: 'left',
                }}
              >
                {language === 'fr' ? product.name : language === 'en' ? product.enName : product.itName}
              </Typography>
              <Typography mt={-0.5} ml={0.5} variant='body1' sx={{ whiteSpace: 'nowrap' }}>
                {product?.price?.toLocaleString() + ' €'}
              </Typography>
            </Box>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{
                height: '3rem',
                maxHeight: '3rem',
                overflow: 'hidden',
                textAlign: 'left',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2, // Set the number of lines to display before applying ellipsis
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.6,
              }}
            >
              {language === 'fr'
                ? product?.description
                : language === 'en'
                ? product?.enDescription
                : product?.itDescription}
            </Typography>
          </CardContent>
          {hasMultipleSizes && (
            <FormControl variant='standard' sx={{ position: 'absolute', left: '1rem', bottom: '1rem', width: '100px' }}>
              <InputLabel>{translate({ tKey: 'shop.size', lang: language })}</InputLabel>
              <Select
                onClick={(e) => e.stopPropagation()}
                value={selectedSize}
                onChange={handleSizeChange}
                size='small'
                sx={{ textAlign: 'left' }}
              >
                {product.sizes.split(';').map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            sx={{ position: 'absolute', right: '1rem', bottom: '1rem' }}
            component='div'
            variant='contained'
            color='primary'
            endIcon={<AddShoppingCart />}
            onClick={handleAddToCart}
          >
            {translate({ tKey: 'shop.addToBasket', lang: language })}
          </Button>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
