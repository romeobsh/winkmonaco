import { Typography } from "@mui/material";
import React from "react";
import Translation from "../general/Translation";
import Image from "next/image";
import Link from "next/link";

const PartnersDefault = () => (
  <React.Fragment>
    <Typography variant='body1' sx={{ marginTop: 4 }}>
      <Translation tKey='partners.defaultFirstLine' />
      <br />
      <Translation tKey='partners.defaultSecondLine' />
    </Typography>
    <Image
      src='/images/partnersDefault.webp'
      style={{ objectFit: "cover", marginTop: "50px", borderRadius: "10px" }}
      alt='Partners picture'
      width={600}
      height={300}
    />
    <Typography variant='body1' sx={{ marginTop: 4 }}>
      <Translation tKey='partners.defaultAd' />
      <Link style={{ textDecoration: "none", color: "#22c6fe", fontWeight: 600 }} href='/contact'>
        <Translation tKey='nav.contact' />
      </Link>{" "}
      !
    </Typography>
  </React.Fragment>
);

export default PartnersDefault;
