import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { fetchData } from '@/lib/handlers/fetchData';
import { ArrowBack } from '@mui/icons-material';
import { translate } from '@/lib/translations/translate';
import { useRouter } from 'next/router';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import ProductCarousel from './ProductCarousel';

const Product = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const { language } = useContext(LanguageContext);

  const router = useRouter();

  useEffect(() => {
    fetchData('products', setIsLoading, setProduct, id);
  }, [id]);

  const pictures = [{ imgPath: product.imageUrl, label: 'Image 1' }];

  if (product.imageUrl2) {
    pictures.push({ imgPath: product.imageUrl2, label: 'Image 2' });
  }

  if (product.imageUrl3) {
    pictures.push({ imgPath: product.imageUrl3, label: 'Image 3' });
  }

  return (
    <Box
      sx={{
        maxWidth: { xs: '600px', md: '1200px' },
        width: '100%',
        margin: '1.2rem auto',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant='h2' mb={1} mt={-1} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {translate({ tKey: 'nav.shop', lang: language })}
      </Typography>
      <Box sx={{ marginTop: '-1rem', textAlign: 'left' }}>
        <Button startIcon={<ArrowBack />} onClick={() => router.push('/shop')}>
          {translate({ tKey: 'general.back', lang: language })}
        </Button>
      </Box>
      {isLoading && <>Loading...</>}
      {!isLoading && (
        <React.Fragment>
          <Card sx={{ color: '##fafafa', padding: '1rem 1rem 4rem' }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <ProductCarousel pictures={pictures} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='h4'>{product.name}</Typography>
              </Grid>
            </Grid>
          </Card>
        </React.Fragment>
      )}
    </Box>
  );
};

export default Product;
