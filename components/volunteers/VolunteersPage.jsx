import { Box, Button, Fade, Typography } from '@mui/material';
import React from 'react';
import Translation from '../general/Translation';
import VolunteersContent from './VolunteersContent';
import { Favorite } from '@mui/icons-material';
import { useRouter } from 'next/router';

const VolunteersPage = ({ data, loading, language }) => {
  const router = useRouter();

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          maxWidth: { xs: '600px', lg: '1000px' },
          width: '100%',
          margin: '1.2rem auto',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' mb={4}>
          <Translation tKey='volunteers.title' lang={language} />
        </Typography>
        <Box>
          <VolunteersContent data={data} loading={loading} language={language} />
          <Button
            variant='contained'
            color='success'
            endIcon={<Favorite />}
            sx={{ marginTop: 4 }}
            onClick={() => router.push('/volunteers/form')}
          >
            <Translation tKey='volunteers.button' lang={language} />
          </Button>
        </Box>
      </Box>
    </Fade>
  );
};

export default React.memo(VolunteersPage);
