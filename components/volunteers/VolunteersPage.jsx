import { Box, Button, Fade, Typography } from '@mui/material';
import React from 'react';
import Translation from '../general/Translation';
import VolunteersContent from './VolunteersContent';
import { ArrowBack, Favorite } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { translate } from '@/lib/translations/translate';

const VolunteersPage = ({ data, loading, language }) => {
  const router = useRouter();

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: { xs: '600px', lg: '1000px' },
          width: '100%',
          margin: '-1rem auto auto',
          justifyContent: 'flex-start',
          textAlign: 'center',
        }}
      >
        <Button startIcon={<ArrowBack />} sx={{ justifyContent: 'flex-start' }} onClick={() => router.push('/')}>
          {translate({ tKey: 'general.back', lang: language })}
        </Button>
        <Typography variant='h1' sx={{ display: 'none' }}>
          <Translation tKey='volunteers.title' lang={language} />
        </Typography>
        <Typography variant='h2' mb={2}>
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
