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
      style={{ objectFit: "cover", marginTop: "50px", borderRadius: "10px" }}
      alt='Partners picture'
      width={600}
      height={300}
    />
  </React.Fragment>
);

export default React.memo(PartnersDefault);
