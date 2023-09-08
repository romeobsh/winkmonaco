import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ContactLoading from "../loading/ContactLoading";
import { Person } from "@mui/icons-material";
import { fetchData } from "@/lib/handlers/fetchData";

const ContactCard = ({ language }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const isMobile = useMediaQuery("(max-width:600px)"); // Check if the screen width is less than or equal to 600px

  useEffect(() => {
    fetchData("contacts", setIsLoading, setData, "singleDocument");
  }, []);

  return (
    <Box sx={{ display: "flex", gap: "1rem", flexDirection: isMobile ? "column" : "row" }}>
      {isLoading && <ContactLoading />}
      {!isLoading && (
        <React.Fragment>
          {data?.profilePic && (
            <Image
              priority
              alt='Photo de profil'
              width={120}
              height={120}
              style={{ borderRadius: "50%", margin: isMobile ? "auto" : "" }}
              src={data.profilePic}
            />
          )}
          {!data?.profilePic && (
            <Avatar sx={{ width: 120, height: 120, backgroundColor: "primary.main" }}>
              <Person sx={{ width: 80, height: 80, backgroundColor: "primary.main" }} />
            </Avatar>
          )}
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: isMobile ? "center" : "left", padding: "5px 0" }}>
            <Typography variant='body1'>{data?.fullName || "Prénom Nom"}</Typography>
            <Link
              style={{ textDecoration: "none" }}
              href={`tel:${language === "en" ? data?.internationalTel.replace(/\s/g, "") : data?.frTel.replace(/\s/g, "")}`}>
              <Typography variant='body1'>{language === "en" ? data?.internationalTel || "Phone number" : data?.frTel || "Numéro tél"}</Typography>
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
