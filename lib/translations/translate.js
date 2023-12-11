import React from 'react';
import { translations } from './translations';

export const translate = ({ tKey, lang }) => {
  const language = lang || 'fr';
  const keys = tKey.split('.');
  const translationObject = translations[language];
  const translation = keys.reduce((obj, key) => obj?.[key], translationObject);
  return translation;
};

export const renderTranslatedText = ({ tKey, lang }) => {
  const text = translate({ tKey, lang });

  return text
    .split(/(\*[^*]+\*)/g)
    .map((part, idx) => (part.startsWith('*') && part.endsWith('*') ? <b key={idx}>{part.slice(1, -1)}</b> : part));
};
