import Donate from '@/components/donations/Donate';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import { Typography } from '@mui/material';
import Head from 'next/head';
import React, { useContext } from 'react';

const DonatePage = () => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.donate', lang: language }) + ' - Wink Monaco'}</title>
        <meta property='og:title' content={translate({ tKey: 'nav.donate', lang: language }) + ' - Wink Monaco'} />
        <meta name='description' content={translate({ tKey: 'seo.donate', lang: language })} />
        <meta property='og:description' content={translate({ tKey: 'seo.donate', lang: language })} />
        <meta name='keywords' content={translate({ tKey: 'seo.donateKeywords', lang: language })} />
        <link rel='canonical' href='https://www.wink-monaco.mc/donate' />
        <meta property='og:url' content='https://www.wink-monaco.mc/donate' />
        <meta property='og:type' content='website' />
      </Head>
      <Typography variant='h1' sx={{ display: 'none' }}>
        {translate({ tKey: 'donate.title', lang: language })}
      </Typography>
      <Donate />
    </React.Fragment>
  );
};

export default DonatePage;
