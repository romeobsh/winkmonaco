import React from "react";
import Image from "next/image";
import PartnersDefault from "./PartnersDefault";
import PartnersLoading from "./PartnersLoading";
import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { Typography, useMediaQuery } from "@mui/material";

const PartnersContent = ({ partners, loading, language }) => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Check if the screen width is less than or equal to 600px

  return (
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
            style={{ objectFit: "cover", width: "100%", marginTop: "40px", height: isMobile ? "10rem" : "18rem", borderRadius: "10px" }}
            alt='Image partenaires'
            width={0}
            height={0}
            sizes='100vw'
            priority
          />
          <Typography variant='body1' sx={{ marginTop: 5 }}>
            {renderTextWithLineBreaks(language === "fr" ? partners?.secondText || "" : partners?.enSecondText || "")}
          </Typography>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default React.memo(PartnersContent);
