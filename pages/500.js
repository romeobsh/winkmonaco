import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useContext } from 'react';

//* Default page for 500 errors
const Custom500 = () => {
  const { language } = useContext(LanguageContext);
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <React.Fragment>
      <Head>
        <title>Error 500 - Wink Monaco</title>
      </Head>
      <Box
        sx={{
          margin: '6rem auto 4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Image
          priority
          alt='500 Server Error'
          src='/images/500.svg'
          style={{
            objectFit: 'contain',
            width: '100%',
            maxWidth: '800px',
            height: isMobile ? '10rem' : '18rem',
            borderRadius: '10px',
          }}
          width={0}
          height={0}
          sizes='100vw'
        />
        <Typography variant='h5' sx={{ mt: 4 }}>
          {translate({ tKey: 'general.error500', lang: language })}
        </Typography>
        <Link href='/'>
          <Button variant='contained' sx={{ mt: 2 }}>
            {translate({ tKey: 'general.backHome', lang: language })}
          </Button>
        </Link>
      </Box>
    </React.Fragment>
  );
};

export default Custom500;
