import { Typography } from "@mui/material";
import React from "react";
import Translation from "../general/Translation";
import Image from "next/image";

const PartnersDefault = ({ language }) => (
  <React.Fragment>
    <Typography variant='body1' sx={{ marginTop: 4 }}>
      <Translation tKey='partners.defaultFirstLine' lang={language} />
      <br />
      <Translation tKey='partners.defaultSecondLine' lang={language} />
    </Typography>
    <Image
      src='/images/partnersDefault.webp'
      style={{ objectFit: "cover", width: "100%", height: "18rem", marginTop: "40px", borderRadius: "10px" }}
      alt='Image partenaires'
      width={0}
      height={0}
      sizes='100vw'
      priority
    />
  </React.Fragment>
);

export default React.memo(PartnersDefault);
