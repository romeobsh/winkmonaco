import RecurringForm from '@/components/donations/RecurringForm';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import React, { useContext } from 'react';

const Recurring = () => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.donate', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <RecurringForm />
    </React.Fragment>
  );
};

export default Recurring;
