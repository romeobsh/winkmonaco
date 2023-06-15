/* eslint-disable @next/next/no-img-element */
import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { Typography } from "@mui/material";
import React from "react";

export const PartnersContent = ({ partners, language }) => (
  <React.Fragment>
    <Typography variant='body1' sx={{ marginTop: 4 }}>
      {language === "fr" ? partners.firstText : partners.enFirstText}
    </Typography>
    <img
      src={partners.imageUrl}
      style={{ objectFit: "cover", marginTop: "40px", borderRadius: "10px", width: "600px", maxWidth: "100%" }}
      alt='Image partenaires'
    />
    <Typography variant='body1' sx={{ marginTop: 4 }}>
      {renderTextWithLineBreaks(language === "fr" ? partners.secondText : partners.enSecondText)}
    </Typography>
  </React.Fragment>
);
