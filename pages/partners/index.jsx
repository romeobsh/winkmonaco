import { LanguageContext } from "@/contexts/LanguageContext";
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
