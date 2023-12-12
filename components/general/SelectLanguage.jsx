import React, { useContext } from 'react';
import Image from 'next/image';
import { Box, MenuItem, Select } from '@mui/material';
import { LanguageContext } from '@/contexts/LanguageContext';

const SelectLanguage = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleChangeLanguage = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <Select
      size='small'
      variant='standard'
      disableUnderline
      color='primary'
      sx={{
        mr: 1,
        '.MuiOutlinedInput-notchedOutline': { border: 0 },
        '.MuiSvgIcon-root ': {
          fill: '#60C7FA !important',
        },
      }}
      onChange={handleChangeLanguage}
      value={language}
      displayEmpty
      MenuProps={{ disableScrollLock: true }}
      renderValue={(value) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {language === 'fr' ? (
              <Image
                priority
                src={'/images/france.webp'}
                width={30}
                height={30}
                alt='drapeau français'
                style={{ padding: '3px 0 0 5px' }}
              />
            ) : language === 'en' ? (
              <Image
                priority
                src={'/images/united-kingdom.webp'}
                width={30}
                height={30}
                alt='drapeau uk'
                style={{ padding: '3px 0 0 5px' }}
              />
            ) : (
              <Image
                priority
                src={'/images/italy.webp'}
                width={30}
                height={30}
                alt='drapeau italien'
                style={{ padding: '3px 0 0 5px' }}
              />
            )}
          </Box>
        );
      }}
    >
      {' '}
      <MenuItem value={'fr'}>Français</MenuItem>
      <MenuItem value={'en'}>English</MenuItem>
      <MenuItem value={'it'}>Italiano</MenuItem>
    </Select>
  );
};

export default SelectLanguage;
