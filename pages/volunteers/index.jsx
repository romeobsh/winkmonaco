import { LanguageContext } from '@/contexts/LanguageContext';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '@/lib/handlers/fetchData';
import VolunteersPage from '@/components/volunteers/VolunteersPage';

const Volunteers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [helpContents, setHelpContents] = useState({});
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData('helpContents', setIsLoading, setHelpContents, 'singleDocument');
  }, []);

  return <VolunteersPage loading={isLoading} data={helpContents} language={language} />;
};

export default Volunteers;
