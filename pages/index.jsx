import React, { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { Box } from '@mui/material';
import HeroContent from '@/components/Home/HeroContent';
import HowToHelp from '@/components/Home/HowToHelp';
import LatestNews from '@/components/Home/LatestNews';
import Head from 'next/head';
import { translate } from '@/lib/translations/translate';

const Home = ({ articles }) => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.home', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Box
        sx={{
          maxWidth: { xs: '600px', md: '1050px' },
          width: '100%',
          margin: '1.2rem auto',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <HeroContent language={language} />
        <LatestNews language={language} articles={articles} />
        <HowToHelp language={language} />
      </Box>
    </React.Fragment>
  );
};

export default Home;

export async function getServerSideProps(ctx) {
  try {
    const hostname = ctx.req.headers.host;

    const { data } = await (await fetch('http://' + hostname + `/api/articles/latest`)).json();
    return {
      props: {
        articles: data || [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        articles: [], // Fallback empty array
      },
    };
  }
}
