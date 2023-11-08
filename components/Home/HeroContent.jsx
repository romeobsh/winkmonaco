import { LanguageContext } from '@/contexts/LanguageContext';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { translate } from '@/lib/translations/translate';
import { Add, Info, Remove } from '@mui/icons-material';
import { Button, Collapse, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

const HeroContent = () => {
  const [isShown, setIsShown] = useState(false);
  const { language } = useContext(LanguageContext);

  return (
    <Grid
      container
      sx={{ maxWidth: '1050px', width: '100%', margin: '1.2rem auto', justifyContent: 'center', textAlign: 'center' }}
    >
      <Grid item xs={12}>
        <Image
          width={216.5}
          height={72}
          src={'/icons/fullLogo.png'}
          alt='Wink Logo'
          layout='responsive'
          style={{ maxWidth: '216.5px' }}
        />
      </Grid>
      <Grid item xs={12} sx={{ padding: 'auto 2rem', marginTop: '1.5rem' }}>
        <Typography>{renderTextWithLineBreaks(translate({ tKey: 'home.heroText', lang: language }))}</Typography>
      </Grid>
      <Collapse in={isShown}>
        <Grid item xs={12} sx={{ padding: 'auto 2rem' }}>
          <Typography mt={4}>
            {renderTextWithLineBreaks(translate({ tKey: 'home.heroText2', lang: language }))}
          </Typography>
          <Link href='/about'>
            <Button variant='contained' color='secondary' startIcon={<Info />} sx={{ mt: 2, mb: 2 }}>
              {translate({ tKey: 'nav.about', lang: language })}
            </Button>
          </Link>
        </Grid>
      </Collapse>
      <Button onClick={() => setIsShown(!isShown)} startIcon={isShown ? <Remove /> : <Add />}>
        {isShown
          ? translate({ tKey: 'general.reduce', lang: language })
          : translate({ tKey: 'general.readMore', lang: language })}
      </Button>
      <Grid
        item
        xs={12}
        sx={{
          paddingLeft: 2,
          paddingRight: 2,
          height: 'auto',
          minHeight: '400px',
          marginTop: 4,
        }}
      >
        <iframe
          style={{
            borderRadius: '1rem',
            border: 'none',
            boxShadow: '2px 2px 10px -2px rgba(0,0,0,0.75)',
            WebkitBoxShadow: '2px 2px 10px -2px rgba(0,0,0,0.75)',
            MozBoxShadow: '2px 2px 10px -2px rgba(0,0,0,0.75)',
          }}
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/W6gFZBi30Yw`}
          allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Embedded youtube'
        />
      </Grid>
    </Grid>
  );
};

export default HeroContent;
