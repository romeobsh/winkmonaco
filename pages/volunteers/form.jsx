import React, { useContext, useEffect, useState } from 'react';
import VolunteersForm from '@/components/volunteers/VolunteersForm';
import { LanguageContext } from '@/contexts/LanguageContext';
import { fetchData } from '@/lib/handlers/fetchData';
import { Box, Typography } from '@mui/material';
import Translation from '@/components/general/Translation';
import Head from 'next/head';
import { translate } from '@/lib/translations/translate';

const VolunteersFormPage = () => {
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
      </Head>
      <Box
        sx={{
          maxWidth: { xs: '600px', lg: '1000px' },
          width: '100%',
          margin: '1.2rem auto',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' mb={4}>
          <Translation tKey='volunteers.title' lang={language} />
        </Typography>
        <VolunteersForm data={helpContents} loading={isLoading} language={language} />
      </Box>
    </React.Fragment>
  );
};

export default VolunteersFormPage;
