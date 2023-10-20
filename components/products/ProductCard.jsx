import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Forward } from '@mui/icons-material';
import { translate } from '@/lib/translations/translate';
import { useRouter } from 'next/router';

export const ProductCard = ({ product, language }) => {
  const router = useRouter();

  return (
    <Grid item xs={12} md={router.pathname === '/' ? 12 : 6} sx={{ padding: { xs: '0.5rem', md: '1rem' } }}>
      <Card sx={{ height: '24rem', borderRadius: '1rem', backgroundColor: '#fff' }} elevation={3}>
        <CardActionArea onClick={() => router.push('/shop/' + product._id)}>
          <Box sx={{ height: '14rem', position: 'relative' }}>
            <CardMedia component='img' image={product.imageUrl} alt='Image' sx={{ height: '100%' }} />
          </Box>
          <CardContent sx={{ height: '10rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
              <Typography mt={1} ml={0.5} variant='body2'>
                Test
              </Typography>
            </Box>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{
                height: '6.5rem',
                maxHeight: '6.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 4, // Set the number of lines to display before applying ellipsis
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.6,
              }}
            >
              Test
            </Typography>
          </CardContent>
          <Button
            sx={{ position: 'absolute', right: '1rem', bottom: '1rem' }}
            component='div'
            variant='contained'
            color='primary'
            endIcon={<Forward />}
          >
            {translate({ tKey: 'general.learnMore', lang: language })}
          </Button>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
