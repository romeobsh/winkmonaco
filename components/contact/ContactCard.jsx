import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ContactLoading from "../loading/ContactLoading";
import { Person } from "@mui/icons-material";

const ContactCard = ({ data, english, loading }) => {
  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      {loading && <ContactLoading />}
      {!loading && (
        <React.Fragment>
          {data?.profilePic && <Image priority alt='Photo de profil' width={120} height={120} style={{ borderRadius: "50%" }} src={data.profilePic} />}
          {!data?.profilePic && (
            <Avatar sx={{ width: 120, height: 120, backgroundColor: "primary.main" }}>
              <Person sx={{ width: 80, height: 80, backgroundColor: "primary.main" }} />
            </Avatar>
          )}
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "18rem", padding: "5px 0" }}>
            <Typography variant='body1'>{data?.fullName || "Prénom Nom"}</Typography>
            <Link style={{ textDecoration: "none" }} href={`tel:${english ? data?.internationalTel.replace(/\s/g, "") : data?.frTel.replace(/\s/g, "")}`}>
              <Typography variant='body1'>{english ? data?.internationalTel || "Phone number" : data?.frTel || "Numéro tél"}</Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} href={`mailto:${data?.email.trim()}`}>
              <Typography variant='body1'>{data?.email || "email@a-renseigner.com"}</Typography>
            </Link>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default React.memo(ContactCard);
