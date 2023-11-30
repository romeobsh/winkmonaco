import { LanguageContext } from '@/contexts/LanguageContext';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '@/lib/handlers/fetchData';
import { ArticlesPage } from '@/components/articles/ArticlesPage';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData('articles', setIsLoading, setArticles);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.articles', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <ArticlesPage loading={isLoading} data={articles} language={language} />
    </React.Fragment>
  );
};

export default Articles;
