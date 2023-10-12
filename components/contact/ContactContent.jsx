import React from 'react';
import Translation from '../general/Translation';
import { Avatar, Button, Grid, Paper, Typography } from '@mui/material';
import ContactCard from './ContactCard';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { translate } from '@/lib/translations/translate';
import { Block, DeveloperBoard, Palette } from '@mui/icons-material';
import Link from 'next/link';

const ContactContent = ({ language, handleClick }) => {
  return (
    <React.Fragment>
      <Typography variant='h2' mb={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Translation tKey='contact.title' lang={language} />
      </Typography>
      <Typography>{renderTextWithLineBreaks(translate({ tKey: 'contact.text', lang: language }))}</Typography>
      <Paper
        sx={{
          width: 'fit-content',
          textAlign: 'left',
          margin: '2rem auto',
          backgroundColor: '#fafafa',
          borderRadius: '1rem',
          padding: '1rem',
        }}
      >
        <ContactCard language={language} />
      </Paper>
      <Typography variant='h4' mb={2} mt={4} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Translation tKey='contact.stopSubscription' lang={language} />
      </Typography>
      <Typography mb={2}>
        {renderTextWithLineBreaks(translate({ tKey: 'contact.stopSubscriptionText', lang: language }))}
      </Typography>
      <Button
        variant='contained'
        color='error'
        endIcon={<Block />}
        sx={{ marginTop: 1, marginBottom: 4, maxWidth: '85%' }}
        onClick={handleClick}
      >
        <Translation tKey='contact.button' lang={language} />
      </Button>
      <Typography
        variant='h4'
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '85%', margin: 'auto auto 2rem' }}
      >
        <Translation tKey='contact.credits' lang={language} />
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              width: 'fit-content',
              margin: 'auto',
              backgroundColor: '#fafafa',
              borderRadius: '1rem',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Avatar sx={{ width: 80, height: 80, backgroundColor: 'primary.main', margin: 'auto' }}>
              <DeveloperBoard sx={{ width: 60, height: 60, backgroundColor: 'primary.main' }} />
            </Avatar>
            <Typography variant='h5'>
              <Translation tKey='contact.developer' lang={language} />
            </Typography>
            <Typography>Steven LUCAS</Typography>
            <Link style={{ textDecoration: 'none' }} href='mailto:steven.lucas2201@gmail.com'>
              <Typography>steven.lucas2201@gmail.com</Typography>
            </Link>
            <Link style={{ textDecoration: 'none' }} href='tel:+33688074187'>
              <Typography>+33 6 88 07 41 87</Typography>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginTop: { xs: 4, md: 'auto' } }}>
          <Paper
            sx={{
              width: 'fit-content',
              margin: 'auto',
              backgroundColor: '#fafafa',
              borderRadius: '1rem',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Avatar sx={{ width: 80, height: 80, backgroundColor: 'primary.main', margin: 'auto' }}>
              <Palette sx={{ width: 60, height: 60, backgroundColor: 'primary.main' }} />
            </Avatar>
            <Typography variant='h5'>Designer</Typography>
            <Typography>Nathan HUART</Typography>
            <Link style={{ textDecoration: 'none' }} href='mailto:nathan.huart@viacesi.fr'>
              <Typography>&nbsp;&nbsp;&nbsp;&nbsp;nathan.huart@viacesi.fr&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
            </Link>
            <Link style={{ textDecoration: 'none' }} href='tel:+33688074187'>
              <Typography>+33 6 83 33 30 78</Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ContactContent;
