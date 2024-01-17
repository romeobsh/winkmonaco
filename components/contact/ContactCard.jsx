import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import ContactLoading from '../loading/ContactLoading';
import { Person } from '@mui/icons-material';
import { fetchData } from '@/lib/handlers/fetchData';

const ContactCard = ({ language, english }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  if (english) {
    language = 'en';
  }

  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px

  useEffect(() => {
    fetchData('contacts', setIsLoading, setData, 'singleDocument');
  }, []);

  return (
    <Box sx={{ display: 'flex', gap: isMobile ? '0.7rem' : '1rem', flexDirection: 'row' }}>
      {isLoading && <ContactLoading />}
      {!isLoading && (
        <React.Fragment>
          {data?.profilePic && (
            <Image
              priority
              alt='Photo de profil'
              width={isMobile ? 80 : 120}
              height={isMobile ? 80 : 120}
              style={{ borderRadius: '50%', margin: isMobile ? 'auto' : '' }}
              src={data.profilePic}
            />
          )}
          {!data?.profilePic && (
            <Avatar
              sx={{
                width: isMobile ? 80 : 120,
                height: isMobile ? 80 : 120,
                backgroundColor: 'primary.main',
                margin: isMobile ? 'auto' : '',
              }}
            >
              <Person sx={{ width: isMobile ? 53 : 80, height: isMobile ? 53 : 80, backgroundColor: 'primary.main' }} />
            </Avatar>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'left',
              padding: '5px 0',
            }}
          >
            <Typography variant='body1'>{data?.fullName || 'Prénom Nom'}</Typography>
            <Link
              style={{ textDecoration: 'none' }}
              href={`tel:${
                language === 'en' || language === 'it'
                  ? data?.internationalTel?.replace(/\s/g, '')
                  : data?.frTel?.replace(/\s/g, '')
              }`}
            >
              <Typography variant={isMobile ? 'body2' : 'body1'}>
                {language === 'en' || language === 'it'
                  ? data?.internationalTel || 'Phone number'
                  : data?.frTel || 'Numéro tél'}
              </Typography>
            </Link>
            <Link style={{ textDecoration: 'none' }} href={`mailto:${data?.email?.trim()}`}>
              <Typography variant={isMobile ? 'body2' : 'body1'}>{data?.email || 'email@a-renseigner.com'}</Typography>
            </Link>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default React.memo(ContactCard);
