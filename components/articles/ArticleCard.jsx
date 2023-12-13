import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Forward, Star } from '@mui/icons-material';
import { translate } from '@/lib/translations/translate';
import { useRouter } from 'next/router';

export const ArticleCard = ({ article, handleClick, language }) => {
  const router = useRouter();

  return (
    <Grid item xs={12} md={router.pathname === '/' ? 12 : 6} sx={{ padding: { xs: '0.5rem', md: '1rem' } }}>
      <Card sx={{ height: '24rem', borderRadius: '1rem', backgroundColor: '#fff' }} elevation={3}>
        <CardActionArea onClick={() => handleClick(article._id)}>
          <CardContent sx={{ height: '10rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2, // Set the number of lines to display before applying ellipsis
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.8,
                  // whiteSpace: 'nowrap',
                  // overflow: 'hidden',
                  // textOverflow: 'ellipsis',
                  fontWeight: 600,
                  textAlign: 'left',
                }}
              >
                {language === 'en' ? article.enTitle : language === 'it' ? article.itTitle : article.title}
              </Typography>
              <Typography mt={1} ml={0.25} variant='body2'>
                {new Date(article.createdAt).toLocaleDateString(language)}
              </Typography>
            </Box>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{
                textAlign: 'left',
                height: '6.5rem',
                maxHeight: '6.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 4, // Set the number of lines to display before applying ellipsis
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.6,
              }}
            >
              {language === 'en' ? article.enContent : language === 'it' ? article.itContent : article.content}
            </Typography>
          </CardContent>
          <Box sx={{ height: '14rem', paddingTop: '1rem', position: 'relative' }}>
            <CardMedia component='img' image={article.imageUrl} alt='Image' sx={{ height: '100%' }} />
            <Button
              sx={{ position: 'absolute', right: '1rem', bottom: '1rem' }}
              component='div'
              variant='contained'
              color='primary'
              endIcon={<Forward />}
            >
              {translate({ tKey: 'general.learnMore', lang: language })}
            </Button>
            {article.priority && (
              <Tooltip placement='right' title={translate({ tKey: 'articles.featured', lang: language })}>
                <IconButton
                  component='div'
                  aria-label={translate({ tKey: 'articles.featured', lang: language })}
                  sx={{
                    position: 'absolute',
                    left: '1rem',
                    bottom: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
                >
                  <Star sx={{ color: '#ffa500' }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
