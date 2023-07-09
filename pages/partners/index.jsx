import { LanguageContext } from "@/contexts/LanguageContext";
import Loading from "@/components/general/Loading";
import Translation from "@/components/general/Translation";
import { PartnersContent } from "@/components/partners/PartnersContent";
import PartnersDefault from "@/components/partners/PartnersDefault";
import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "@/lib/handlers/fetchData";
import { PartnersPage } from "@/components/partners/PartnersPage";

const Partners = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState({});
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData("partners", setIsLoading, setPartners, "singleDocument");
  }, []);

  return <PartnersPage loading={isLoading} partners={partners} language={language} />;
};

export default Partners;
