import { LanguageContext } from '@/contexts/LanguageContext';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { translate } from '@/lib/translations/translate';
import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useContext } from 'react';
import ContactCard from '../contact/ContactCard';
import { CalendarMonth, LooksOne } from '@mui/icons-material';
import { useRouter } from 'next/router';

const Donate = () => {
  const { language } = useContext(LanguageContext);
  const router = useRouter();

  return (
    <React.Fragment>
      <Box
        sx={{
          maxWidth: { xs: '600px', md: '1050px' },
          width: '100%',
          margin: '1.2rem auto',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' mb={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {translate({ tKey: 'donate.title', lang: language })}
        </Typography>
        <Box>
          <Box>
            <Typography sx={{ maxWidth: '850px', margin: 'auto auto 1.5rem' }}>
              {renderTextWithLineBreaks(translate({ tKey: 'donate.mainText', lang: language }))}
            </Typography>
            <Typography variant='h6' mb={2}>
              {translate({ tKey: 'donate.iMakeA', lang: language })}
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: '1rem', md: ' 3rem' }, width: 'fit-content', margin: 'auto' }}>
              <Button
                onClick={() => router.push('/donate/recurring')}
                sx={{
                  borderRadius: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '7.5rem',
                  height: '7.5rem',
                }}
                variant='contained'
                color='secondary'
              >
                <Typography color='white' mb={0.6} sx={{ fontWeight: 600 }}>
                  {translate({ tKey: 'donate.recurring', lang: language })}
                </Typography>
                <CalendarMonth fontSize='large' />
              </Button>
              <Button
                onClick={() => router.push('/donate/oneTime')}
                sx={{
                  borderRadius: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '7.5rem',
                  height: '7.5rem',
                }}
                variant='contained'
                color='secondary'
              >
                <Typography color='white' mb={0.6} sx={{ fontWeight: 600 }}>
                  {translate({ tKey: 'donate.oneTime', lang: language })}
                </Typography>
                <LooksOne fontSize='large' />
              </Button>
            </Box>
          </Box>
        </Box>
        <Typography variant='h4' mt={4} mb={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {translate({ tKey: 'donate.help', lang: language })}
        </Typography>
        <Typography> {translate({ tKey: 'donate.donationService', lang: language })}</Typography>
        <Paper
          sx={{
            backgroundColor: '#fafafa',
            width: 'fit-content',
            textAlign: 'left',
            margin: '2rem auto',
            borderRadius: '1rem',
            padding: '1rem',
          }}
        >
          <ContactCard language={language} />
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default Donate;
