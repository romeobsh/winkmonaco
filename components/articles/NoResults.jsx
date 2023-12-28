import React from 'react';
import Image from 'next/image';
import { Grid, Typography } from '@mui/material';
import { translate } from '@/lib/translations/translate';

const NoResults = (props) => {
  return (
    <Grid item xs={12} mt={4} mb={4}>
      <Typography mb={4}>
        {props.filter
          ? translate({ tKey: 'articles.noArticlesFiltered', lang: props.language }) +
            ' ' +
            new Date(props.year).getFullYear() +
            '.'
          : translate({ tKey: 'articles.noArticles', lang: props.language })}
      </Typography>
      <Image
        src='/images/void.svg'
        height={150}
        width={150}
        alt={translate({ tKey: 'general.noResults', language: props.language })}
      />
    </Grid>
  );
};

export default NoResults;
