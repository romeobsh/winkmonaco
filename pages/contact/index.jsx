import Contact from '@/components/contact/Contact';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import { Typography } from '@mui/material';
import Head from 'next/head';
import React, { useContext } from 'react';

const ContactPage = () => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.contact', lang: language }) + ' - Wink Monaco'}</title>
        <meta property='og:title' content={translate({ tKey: 'nav.contact', lang: language }) + ' - Wink Monaco'} />
        <meta name='description' content={translate({ tKey: 'seo.contact', lang: language })} />
        <meta property='og:description' content={translate({ tKey: 'seo.contact', lang: language })} />
        <meta name='keywords' content={translate({ tKey: 'seo.contactKeywords', lang: language })} />
        <link rel='canonical' href='https://www.wink-monaco.mc/contact' />
        <meta property='og:url' content='https://www.wink-monaco.mc/contact' />
        <meta property='og:type' content='website' />
      </Head>
      <Typography variant='h1' sx={{ display: 'none' }}>
        {translate({ tKey: 'contact.title', lang: language })}
      </Typography>
      <Contact />
    </React.Fragment>
  );
};

export default ContactPage;
