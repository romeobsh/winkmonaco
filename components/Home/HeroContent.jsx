import { LanguageContext } from "@/contexts/LanguageContext";
import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { translate } from "@/lib/translations/translate";
import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";

const HeroContent = () => {
  const { language } = useContext(LanguageContext);

  return (
    <Grid container sx={{ maxWidth: "1050px", width: "100%", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
      <Grid item xs={12}>
        <Typography variant='h2' mb={2}>
          Wink Monaco
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} sx={{ paddingRight: { xs: 0, md: 4 } }}>
        <Typography>{renderTextWithLineBreaks(translate({ tKey: "home.heroText", lang: language }))}</Typography>
      </Grid>
      <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: 0, md: 4 }, height: { xs: "250px", sm: "350px", md: "auto" }, marginTop: { xs: 4, md: 0 } }}>
        <iframe
          style={{
            borderRadius: "1rem",
            border: "none",
            boxShadow: "2px 2px 10px -2px rgba(0,0,0,0.75)",
            WebkitBoxShadow: "2px 2px 10px -2px rgba(0,0,0,0.75)",
            MozBoxShadow: "2px 2px 10px -2px rgba(0,0,0,0.75)",
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
