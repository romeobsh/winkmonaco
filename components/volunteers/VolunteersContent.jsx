import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import VolunteersDefault from './VolunteersDefault';
import VolunteersLoading from './VolunteersLoading';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import Translation from '../general/Translation';

const VolunteersContent = ({ data, loading, language }) => {
  const [kit, setKit] = useState([]);

  useEffect(() => {
    if (!loading && Object.keys(data).length > 0) {
      const kitLanguage =
        language === 'en' ? data?.enKitContent : language === 'it' ? data?.itKitContent : data?.kitContent;
      const shapedKit = kitLanguage
        .replace(/;\s*$/, '')
        .trim()
        .split(';')
        .map((item) => item.trim());
      setKit(shapedKit);
    }
  }, [loading, data, language]);

  return (
    <React.Fragment>
      {loading && <VolunteersLoading />}
      {!loading && Object.keys(data).length === 0 && <VolunteersDefault language={language} />}
      {!loading && Object.keys(data).length > 0 && (
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid item xs={12} lg={data?.isActiveKit ? 6 : 12} p={{ xs: '0 0 2rem 0', lg: '0 2rem 0 0' }}>
            <Typography mb={2}>
              {renderTextWithLineBreaks(
                language === 'en' ? data?.enFirstText : language === 'it' ? data?.itFirstText : data?.firstText
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6} p={{ xs: 0, lg: '0 0 0 2rem' }}>
            {data?.isActiveKit && (
              <Paper sx={{ backgroundColor: '#fafafa', padding: '1rem', borderRadius: '1rem' }}>
                <Typography variant='h6'>
                  <Translation tKey='volunteers.winkKit' lang={language} />
                  <List dense={kit.length > 4}>
                    {kit.map((item, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <ArrowRight fontSize='large' />
                        </ListItemIcon>
                        <ListItemText key={i + 'item'}>
                          <Typography variant='body1'>{item}</Typography>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Typography>
              </Paper>
            )}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              margin: 'auto',
              flexDirection: { xs: 'column', lg: 'row' },
              height: { xs: '36rem', lg: '18rem' },
              marginTop: '4rem',
            }}
          >
            <Grid item xs={12} lg={6} sx={{ display: 'flex', height: '18rem' }}>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{
                  overflow: 'hidden',
                  borderRadius: { xs: '1rem 0 0 0', lg: '1rem 0 0 1rem' },
                  padding: '0 0.25rem 0 0',
                }}
              >
                <Image
                  unoptimized
                  src={data.imageUrl}
                  style={{ objectFit: 'cover', width: '100%', height: '18rem' }}
                  alt='Box packing'
                  width={0}
                  height={0}
                  sizes='100vw'
                  priority
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{ overflow: 'hidden', borderRadius: { xs: '0 1rem 0 0', lg: '0 0 0 0' }, padding: '0 0 0 0.25rem' }}
              >
                <Image
                  unoptimized
                  src={data.imageUrl2}
                  style={{ objectFit: 'cover', width: '100%', height: '18rem' }}
                  alt='Box packing'
                  width={0}
                  height={0}
                  sizes='100vw'
                  priority
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                overflow: 'hidden',
                borderRadius: { xs: '0 0 1rem 1rem', lg: '0 1rem 1rem 0' },
                padding: { xs: '0', lg: '0 0 0 0.5rem' },
                marginTop: { xs: '0.5rem', lg: '0' },
                height: '18rem',
              }}
            >
              {' '}
              <Image
                unoptimized
                src={data.imageUrl3}
                style={{ objectFit: 'cover', width: '100%', height: '18rem' }}
                alt='Box packing'
                width={0}
                height={0}
                sizes='100vw'
                priority
              />
            </Grid>
          </Box>
          <Grid item xs={12} mt={8} p={{ xs: 0, lg: '0 2rem' }}>
            <Typography>
              {renderTextWithLineBreaks(
                language === 'en' ? data?.enSecondText : language === 'it' ? data?.itSecondText : data?.secondText
              )}
            </Typography>
          </Grid>
          <Typography variant='body1' sx={{ marginTop: 4 }}>
            <br />
          </Typography>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default VolunteersContent;
