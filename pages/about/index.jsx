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
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.about', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Grid
        container
        sx={{ maxWidth: '800px', width: '100%', margin: '1.2rem auto', justifyContent: 'center', textAlign: 'center' }}
      >
        <Grid item xs={12}>
          <Typography variant='h2' mb={1}>
            {translate({ tKey: 'about.title', lang: language })}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ padding: 'auto 2rem', marginTop: '1.5rem' }}>
          <Typography>{renderTextWithLineBreaks(translate({ tKey: 'about.heroText', lang: language }))}</Typography>
        </Grid>
        <Image
          src='/images/defaultAbout.jpeg'
          style={{
            objectFit: 'cover',
            width: '100%',
            marginTop: '40px',
            height: isMobile ? '10rem' : '18rem',
            borderRadius: '10px',
          }}
          alt="Image de l'association"
          width={0}
          height={0}
          sizes='100vw'
          priority
        />
        <HowToHelp />
      </Grid>
    </React.Fragment>
  );
};

export default About;
