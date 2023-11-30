import React, { useContext, useEffect, useState } from 'react';
import { fetchData } from '@/lib/handlers/fetchData';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import ArticleLoading from './ArticleLoading';
import { LanguageContext } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { ArrowBack } from '@mui/icons-material';
import { translate } from '@/lib/translations/translate';
import { useRouter } from 'next/router';

const Article = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const { language } = useContext(LanguageContext);

  const router = useRouter();

  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px

  useEffect(() => {
    fetchData('articles', setIsLoading, setArticle, id);
  }, [id]);

  return (
    <Box
      sx={{
        maxWidth: { xs: '600px', md: '1200px' },
        width: '100%',
        margin: '1.2rem auto',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {isLoading && <ArticleLoading />}
      {!isLoading && (
        <React.Fragment>
          <Typography variant='h2' mb={1} mt={-1} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {language === 'en' ? article.enTitle : language === 'it' ? article.itTitle : article.title}
          </Typography>
          <Box
            sx={{
              marginTop: '-1rem',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 1,
            }}
          >
            <Button startIcon={<ArrowBack />} onClick={() => router.push('/articles')}>
              {translate({ tKey: 'general.back', lang: language })}
            </Button>
            <Typography variant='body2' sx={{ textAlign: 'right' }}>
              Publié le {new Date(article.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography mb={3}>
            {renderTextWithLineBreaks(
              language === 'fr'
                ? article?.content?.trim() || ''
                : language === 'it'
                ? article?.itContent?.trim() || ''
                : article?.enContent?.trim() || ''
            )}
          </Typography>
          <Image
            src={article.imageUrl}
            style={{
              objectFit: 'contain',
              width: 'fit-content',
              maxWidth: '100%',
              height: isMobile ? '10rem' : '18rem',
              borderRadius: '10px',
            }}
            alt='Image article'
            width={0}
            height={0}
            sizes='100vw'
            priority
          />
        </React.Fragment>
      )}
    </Box>
  );
};

export default Article;
