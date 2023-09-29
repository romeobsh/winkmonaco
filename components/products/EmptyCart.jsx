import { LanguageContext } from "@/contexts/LanguageContext";
import { translate } from "@/lib/translations/translate";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const EmptyCart = () => {
  const { language } = useContext(LanguageContext);
  const isMobile = useMediaQuery("(max-width:600px)"); // Check if the screen width is less than or equal to 600px

  return (
    <Box
      sx={{
        margin: "2rem auto auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        maxWidth: isMobile ? "90%" : "800px",
      }}>
      <Image
        priority
        alt='Shop unavailable'
        src='/images/emptyCart.svg'
        style={{ objectFit: "contain", width: "100%", maxWidth: "800px", height: isMobile ? "10rem" : "16rem", borderRadius: "10px" }}
        width={0}
        height={0}
        sizes='100vw'
      />
      <Typography variant='h5' sx={{ mt: 4 }} mb={2}>
        {" "}
        {translate({ tKey: "shop.emptyCart", lang: language })}
      </Typography>
      <Link href='/shop'>
        <Button variant='contained' sx={{ mt: 2 }}>
          {translate({ tKey: "shop.emptyCartButton", lang: language })}
        </Button>
      </Link>
    </Box>
  );
};

export default EmptyCart;
