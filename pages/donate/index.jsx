import Donate from '@/components/donations/Donate';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import React, { useContext } from 'react';

const DonatePage = () => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.donate', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Donate />
    </React.Fragment>
  );
};

export default DonatePage;
