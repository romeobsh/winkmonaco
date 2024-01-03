import { LanguageContext } from '@/contexts/LanguageContext';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { translate } from '@/lib/translations/translate';
import { ArrowBack } from '@mui/icons-material';
import { Button, Card, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

const Legal = () => {
  const { language } = useContext(LanguageContext);
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.legal', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Card sx={{ padding: { xs: '1rem 1.5rem', lg: '2rem 4rem' }, borderRadius: '16px' }}>
        <Button startIcon={<ArrowBack />} onClick={() => router.push('/')}>
          {translate({ tKey: 'general.back', lang: language })}
        </Button>
        <Typography variant='h2' sx={{ marginTop: { xs: '0', lg: '-2rem' }, textAlign: 'center' }}>
          {translate({ tKey: 'legal.title', lang: language })}
        </Typography>
        <Typography sx={{ textAlign: 'justify' }}>
          {renderTextWithLineBreaks(translate({ tKey: 'legal.heroText', lang: language }))}
        </Typography>
        <Typography>
          Le Patio Palace
          <br />
          41 avenue Hector Otto
          <br />
          98000 Monaco
          <br />
          Principauté de Monaco
          <br />
          <br />
          Email : <Link href={'mailto:winkmonaco@gmail.com'}>winkmonaco@gmail.com</Link>
        </Typography>
      </Card>
    </React.Fragment>
  );
};

export default Legal;
