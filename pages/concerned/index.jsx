import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import React, { useContext } from 'react';

const Concerned = () => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.concerned', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      En développement
    </React.Fragment>
  );
};

export default Concerned;
