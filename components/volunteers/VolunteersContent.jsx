import React from "react";
import Image from "next/image";
import VolunteersDefault from "./VolunteersDefault";
import VolunteersLoading from "./VolunteersLoading";
import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { Typography } from "@mui/material";

const VolunteersContent = ({ data, loading, language }) => (
  <React.Fragment>
    {loading && <VolunteersLoading />}
    {!loading && Object.keys(data).length === 0 && <VolunteersDefault language={language} />}
    {!loading && Object.keys(data).length > 0 && (
      <React.Fragment>
        <Typography variant='body1' sx={{ marginTop: 4 }}>
          {language === "fr" ? data.firstText : data.enFirstText}
        </Typography>
        <Image
          src={data.imageUrl}
          style={{ objectFit: "cover", marginTop: "40px", borderRadius: "10px", maxWidth: "100%" }}
          alt='Image partenaires'
          width={600}
          height={300}
          priority
        />
        <Typography variant='body1' sx={{ marginTop: 4 }}>
          {renderTextWithLineBreaks(language === "fr" ? data?.secondText || "" : data?.enSecondText || "")}
        </Typography>
      </React.Fragment>
    )}
  </React.Fragment>
);

export default VolunteersContent;
