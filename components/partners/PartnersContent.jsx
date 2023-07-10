import React from "react";
import Image from "next/image";
import PartnersDefault from "./PartnersDefault";
import PartnersLoading from "./PartnersLoading";
import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { Typography } from "@mui/material";

const PartnersContent = ({ partners, loading, language }) => (
  <React.Fragment>
    {loading && <PartnersLoading />}
    {!loading && Object.keys(partners).length === 0 && <PartnersDefault language={language} />}
    {!loading && Object.keys(partners).length > 0 && (
      <React.Fragment>
        <Typography variant='body1' sx={{ marginTop: 4 }}>
          {language === "fr" ? partners.firstText : partners.enFirstText}
        </Typography>
        <Image
          src={partners.imageUrl}
          style={{ objectFit: "cover", marginTop: "40px", borderRadius: "10px", maxWidth: "100%" }}
          alt='Image partenaires'
          width={600}
          height={300}
          priority
        />
        <Typography variant='body1' sx={{ marginTop: 5 }}>
          {renderTextWithLineBreaks(language === "fr" ? partners?.secondText || "" : partners?.enSecondText || "")}
        </Typography>
      </React.Fragment>
    )}
  </React.Fragment>
);

export default React.memo(PartnersContent);
