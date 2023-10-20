import React from 'react';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import Translation from '../general/Translation';
import Image from 'next/image';
import { ArrowRight } from '@mui/icons-material';

const VolunteersDefault = ({ language }) => {
  const defaultKitContent =
    language === 'en'
      ? ['5 posters', '30 business cards', "Pair of 'RP' glasses", 'Guide explaining how to help us']
      : language === 'it'
      ? ['5 poster', '30 biglietti da visita', "Coppia di occhiali 'RP'", 'Guida che spiega come aiutarci']
      : [
          '5 affiches',
          '30 cartes de visite',
          "Paire de lunettes 'RP'",
          'Feuille de route vous expliquant comment nous venir en aide',
        ];

  return (
    <Grid container sx={{ alignItems: 'center' }}>
      <Grid item xs={12} lg={6} p={{ xs: '0 0 2rem 0', lg: '0 2rem 0 0' }}>
        <Typography mb={2}>
          {' '}
          <Translation tKey='volunteers.defaultFirstLine' lang={language} />
        </Typography>
        <Typography mb={3}>
          {' '}
          <Translation tKey='volunteers.defaultSecondLine' lang={language} />
        </Typography>
        <Typography variant='body2'>
          {' '}
          <Translation tKey='volunteers.defaultThirdLine' lang={language} />
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6} p={{ xs: 0, lg: '0 0 0 2rem' }}>
        <Paper sx={{ backgroundColor: '#fafafa', padding: '1rem', borderRadius: '1rem' }}>
          <Typography variant='h6'>
            <Translation tKey='volunteers.winkKit' lang={language} />
            <List>
              {defaultKitContent.map((item, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    <ArrowRight fontSize='large' />
                  </ListItemIcon>
                  <ListItemText key={i + 'item'}>
                    <Typography variant='body1'>{item}</Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Typography>
        </Paper>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          margin: 'auto',
          flexDirection: { xs: 'column', lg: 'row' },
          height: { xs: '36rem', lg: '18rem' },
          marginTop: '4rem',
        }}
      >
        <Grid item xs={12} lg={6} sx={{ display: 'flex', height: '18rem' }}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              overflow: 'hidden',
              borderRadius: { xs: '1rem 0 0 0', lg: '1rem 0 0 1rem' },
              padding: '0 0.25rem 0 0',
            }}
          >
            {' '}
            <Image
              src='/images/volDefault2.webp'
              style={{ objectFit: 'cover', width: '100%', height: '18rem' }}
              alt='Box packing'
              width={0}
              height={0}
              sizes='100vw'
              priority
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{ overflow: 'hidden', borderRadius: { xs: '0 1rem 0 0', lg: '0 0 0 0' }, padding: '0 0 0 0.25rem' }}
          >
            {' '}
            <Image
              src='/images/volDefault1.jpg'
              style={{ objectFit: 'cover', width: '100%', height: '18rem' }}
              alt='Box packing'
              width={0}
              height={0}
              sizes='100vw'
              priority
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            overflow: 'hidden',
            borderRadius: { xs: '0 0 1rem 1rem', lg: '0 1rem 1rem 0' },
            padding: { xs: '0', lg: '0 0 0 0.5rem' },
            marginTop: { xs: '0.5rem', lg: '0' },
            height: '18rem',
          }}
        >
          {' '}
          <Image
            src='/images/volDefault3.jpg'
            style={{ objectFit: 'cover', width: '100%', height: '18rem' }}
            alt='Box packing'
            width={0}
            height={0}
            sizes='100vw'
            priority
          />
        </Grid>
      </Box>
      <Grid item xs={12} mt={8} p={{ xs: 0, lg: '0 2rem' }}>
        <Typography mb={2}>
          <Translation tKey='volunteers.defaultFourthLine' lang={language} />
        </Typography>
        <Typography>
          <Translation tKey='volunteers.defaultFifthLine' lang={language} />
        </Typography>
      </Grid>
      <Typography variant='body1' sx={{ marginTop: 4 }}>
        <br />
      </Typography>
    </Grid>
  );
};

export default VolunteersDefault;
