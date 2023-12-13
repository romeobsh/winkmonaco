import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

const ProductLoading = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Skeleton variant='rectangular' sx={{ height: '20rem', width: '100%', borderRadius: '10px' }} />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          padding: '0.5rem 1.5rem 0rem',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Skeleton variant='text' sx={{ height: '2rem', width: '70%' }} />

        <Box>
          <Skeleton variant='text' sx={{ height: '1.5rem', width: '100%' }} />
          <Skeleton variant='text' sx={{ height: '1.5rem', width: '75%' }} />
          <Skeleton variant='text' sx={{ height: '1.5rem', width: '80%' }} />
          <Skeleton variant='text' sx={{ height: '1.5rem', width: '65%' }} />
        </Box>

        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 2,
              marginTop: 4,
            }}
          >
            <Skeleton variant='rectangular' sx={{ height: '2rem', width: '15%', borderRadius: '10px' }} />
            <Skeleton variant='rectangular' sx={{ height: '2rem', width: '15%', borderRadius: '10px' }} />
          </Box>
          <Skeleton variant='rectangular' sx={{ height: '3rem', width: '100%', borderRadius: '10px' }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductLoading;
