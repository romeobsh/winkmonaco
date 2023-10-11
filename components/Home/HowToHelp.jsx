import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import { Favorite, VolunteerActivism } from '@mui/icons-material';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

const HowToHelp = () => {
  const { language } = useContext(LanguageContext);
  const router = useRouter();

  return (
    <Grid
      container
      sx={{
        maxWidth: '850px',
        width: '100%',
        margin: '2.4rem auto 1.2rem',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Grid item xs={12}>
        <Typography variant='h4'>{translate({ tKey: 'home.howToHelp', lang: language })}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} mt={2} sx={{ paddingRight: { xs: 0, sm: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <Typography> {translate({ tKey: 'home.youCanDonate', lang: language })}</Typography>
          <Link>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<Favorite />}
              sx={{ mt: 2 }}
              onClick={() => router.push('/donate')}
            >
              {translate({ tKey: 'nav.donateButton', lang: language })}
            </Button>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} mt={{ xs: 4, sm: 2 }} sx={{ paddingLeft: { xs: 0, sm: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <Typography> {translate({ tKey: 'home.youCanHelp', lang: language })}</Typography>
          <Link>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<VolunteerActivism />}
              sx={{ mt: 2 }}
              onClick={() => router.push('/volunteers')}
            >
              {translate({ tKey: 'nav.help', lang: language })}
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HowToHelp;
