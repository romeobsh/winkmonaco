import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import React, { useContext } from 'react';

const Legal = () => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.legal', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
    </React.Fragment>
  );
};

export default Legal;
