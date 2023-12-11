import { LanguageContext } from '@/contexts/LanguageContext';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '@/lib/handlers/fetchData';
import { PartnersPage } from '@/components/partners/PartnersPage';
import Head from 'next/head';
import { translate } from '@/lib/translations/translate';
import { Typography } from '@mui/material';

const Partners = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState({});
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData('partners', setIsLoading, setPartners, 'singleDocument');
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.partners', lang: language }) + ' - Wink Monaco'}</title>
        <meta property='og:title' content={translate({ tKey: 'nav.partners', lang: language }) + ' - Wink Monaco'} />
        <meta name='description' content={translate({ tKey: 'seo.partners', lang: language })} />
        <meta property='og:description' content={translate({ tKey: 'seo.partners', lang: language })} />
        <meta name='keywords' content={translate({ tKey: 'seo.partnersKeywords', lang: language })} />
        <link rel='canonical' href='https://www.wink-monaco.mc/partners' />
        <meta property='og:url' content='https://www.wink-monaco.mc/partners' />
        <meta property='og:type' content='website' />
      </Head>
      <Typography variant='h1' sx={{ display: 'none' }}>
        {translate({ tKey: 'partners.title', lang: language })}
      </Typography>
      <PartnersPage loading={isLoading} partners={partners} language={language} />
    </React.Fragment>
  );
};

export default Partners;
