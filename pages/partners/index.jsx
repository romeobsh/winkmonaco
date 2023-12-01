import { LanguageContext } from '@/contexts/LanguageContext';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '@/lib/handlers/fetchData';
import { PartnersPage } from '@/components/partners/PartnersPage';
import Head from 'next/head';
import { translate } from '@/lib/translations/translate';

const Partners = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState({});
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData('partners', setIsLoading, setPartners, 'singleDocument');
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.partners', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <PartnersPage loading={isLoading} partners={partners} language={language} />
    </React.Fragment>
  );
};

export default Partners;
