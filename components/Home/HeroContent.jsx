import { LanguageContext } from '@/contexts/LanguageContext';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { translate } from '@/lib/translations/translate';
import { Add, Info, Remove } from '@mui/icons-material';
import { Button, Collapse, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
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
      <Button color='secondary' onClick={() => setIsShown(!isShown)} startIcon={isShown ? <Remove /> : <Add />}>
        {isShown
          ? translate({ tKey: 'general.reduce', lang: language })
          : translate({ tKey: 'general.readMore', lang: language })}
      </Button>
      <Grid
        item
        xs={12}
        sx={{
          height: 'auto',
          marginTop: 4,
          position: 'relative', // new style
          paddingBottom: '56.25%', // for 16:9 aspect ratio
          height: 0, // use padding to determine height
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <iframe
            style={{
              borderRadius: '1rem',
              border: 'none',
              boxShadow: '2px 2px 10px -2px rgba(0,0,0,0.75)',
              WebkitBoxShadow: '2px 2px 10px -2px rgba(0,0,0,0.75)',
              MozBoxShadow: '2px 2px 10px -2px rgba(0,0,0,0.75)',
              width: '100%', // ensure it covers the full width of the parent
              height: '100%', // ensure it covers the full height of the parent
            }}
            src={
              language === 'fr'
                ? `https://youtube.com/embed/qHtXdPnzfRg`
                : language === 'en'
                ? `https://youtube.com/embed/AemBjXs2zLc`
                : `https://youtube.com/embed/XGqGgrLX0qY`
            }
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='Embedded youtube'
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default HeroContent;
