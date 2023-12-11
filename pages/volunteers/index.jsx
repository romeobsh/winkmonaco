import { LanguageContext } from '@/contexts/LanguageContext';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '@/lib/handlers/fetchData';
import VolunteersPage from '@/components/volunteers/VolunteersPage';
import Head from 'next/head';
import { translate } from '@/lib/translations/translate';
import { Typography } from '@mui/material';

const Volunteers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [helpContents, setHelpContents] = useState({});
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData('helpContents', setIsLoading, setHelpContents, 'singleDocument');
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.help', lang: language }) + ' - Wink Monaco'}</title>
        <meta property='og:title' content={translate({ tKey: 'nav.volunteers', lang: language }) + ' - Wink Monaco'} />
        <meta name='description' content={translate({ tKey: 'seo.volunteers', lang: language })} />
        <meta property='og:description' content={translate({ tKey: 'seo.volunteers', lang: language })} />
        <meta name='keywords' content={translate({ tKey: 'seo.volunteersKeywords', lang: language })} />
        <link rel='canonical' href='https://www.wink-monaco.mc/volunteers' />
        <meta property='og:url' content='https://www.wink-monaco.mc/volunteers' />
        <meta property='og:type' content='website' />
      </Head>
      <Typography variant='h1' sx={{ display: 'none' }}>
        {translate({ tKey: 'volunteers.title', lang: language })}
      </Typography>
      <VolunteersPage loading={isLoading} data={helpContents} language={language} />
    </React.Fragment>
  );
};

export default Volunteers;
