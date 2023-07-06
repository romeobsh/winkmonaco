import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ContactLoading from "../loading/ContactLoading";

const ContactCard = ({ data, english, loading }) => {
  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      {loading && <ContactLoading />}
      {!loading && (
        <React.Fragment>
          <Image priority alt='Photo de profil' width={120} height={120} style={{ borderRadius: "50%" }} src={data.profilePic} />
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "18rem", padding: "5px 0" }}>
            <Typography variant='body1'>{data.fullName}</Typography>
            <Link style={{ textDecoration: "none" }} href={`tel:${english ? data.internationalTel.replace(/\s/g, "") : data.frTel.replace(/\s/g, "")}`}>
              <Typography variant='body1'>{english ? data.internationalTel : data.frTel}</Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} href={`mailto:${data.email.trim()}`}>
              <Typography variant='body1'>{data.email}</Typography>
            </Link>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default React.memo(ContactCard);
