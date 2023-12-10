import React from 'react';

export const renderTextWithLineBreaks = (text) => {
  const lines = text?.split('\n');
  return lines?.map((line, index) => (
    <React.Fragment key={index}>
      {line
        .split(/(\*[^*]+\*)/g)
        .map((part, idx) => (part.startsWith('*') && part.endsWith('*') ? <b key={idx}>{part.slice(1, -1)}</b> : part))}
      <br />
    </React.Fragment>
  ));
};
