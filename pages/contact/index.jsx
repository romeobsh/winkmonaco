import Contact from '@/components/contact/Contact';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import React, { useContext } from 'react';

const ContactPage = () => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.contact', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Contact />
    </React.Fragment>
  );
};

export default ContactPage;
