import HowToHelp from '@/components/Home/HowToHelp';
import { LanguageContext } from '@/contexts/LanguageContext';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { translate } from '@/lib/translations/translate';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import React, { useContext } from 'react';

const About = () => {
  const { language } = useContext(LanguageContext);
  const isMobile = useMediaQuery('(max-width:950px)'); // Check if the screen width is less than or equal to 950px

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.about', lang: language }) + ' - Wink Monaco'}</title>
        <meta property='og:title' content={translate({ tKey: 'nav.about', lang: language }) + ' - Wink Monaco'} />
        <meta name='description' content={translate({ tKey: 'seo.about', lang: language })} />
        <meta property='og:description' content={translate({ tKey: 'seo.about', lang: language })} />
        <meta name='keywords' content={translate({ tKey: 'seo.aboutKeywords', lang: language })} />
        <link rel='canonical' href='https://www.wink-monaco.mc/about' />
        <meta property='og:url' content='https://www.wink-monaco.mc/about' />
        <meta property='og:type' content='website' />
      </Head>
      <Grid
        container
        sx={{ maxWidth: '800px', width: '100%', margin: '1.2rem auto', justifyContent: 'center', textAlign: 'center' }}
      >
        <Grid item xs={12}>
          <Typography variant='h1' sx={{ display: 'none' }}>
            {translate({ tKey: 'about.title', lang: language })}
          </Typography>
          <Typography variant='h2' mb={1}>
            {translate({ tKey: 'about.title', lang: language })}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ padding: 'auto 2rem', marginTop: '1.5rem' }}>
          <Typography>{renderTextWithLineBreaks(translate({ tKey: 'about.heroText', lang: language }))}</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Image
            unoptimized
            src='/images/about1.jpg'
            style={{
              objectFit: 'contain',
              width: 'fit-content',
              maxWidth: isMobile ? '100%' : null,
              borderRadius: isMobile ? '1rem' : '1rem 0 0 1rem',
              maxHeight: '24rem',
              marginTop: '40px',
              height: 'auto',
            }}
            alt="Image de l'association"
            width={0}
            height={0}
            sizes='100vw'
            priority
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Image
            unoptimized
            src='/images/about2.jpg'
            style={{
              objectFit: 'contain',
              width: 'fit-content',
              maxWidth: isMobile ? '100%' : null,
              borderRadius: isMobile ? '1rem' : '0 1rem 1rem 0',
              maxHeight: '24rem',
              marginTop: isMobile ? '1rem' : '40px',
              height: isMobile ? '24rem' : 'auto',
            }}
            alt="Image de l'association"
            width={0}
            height={0}
            sizes='100vw'
            priority
          />
        </Grid>
        <HowToHelp />
      </Grid>
    </React.Fragment>
  );
};

export default About;
