import { LanguageContext } from "@/contexts/LanguageContext";
import Loading from "@/components/general/Loading";
import Translation from "@/components/general/Translation";
import { PartnersContent } from "@/components/partners/PartnersContent";
import PartnersDefault from "@/components/partners/PartnersDefault";
import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Partners = () => {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState({});
  const { language, changeLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // Make the API call to fetch the article data based on the ID
        const response = await fetch(`/api/partners/view`);
        let data = await response.json();

        if (data.data.length > 0) {
          data = data.data[0] ?? "";
          // Set the initial values based on the fetched data
          setPartners({
            firstText: data.firstText ?? "",
            enFirstText: data.enFirstText ?? "",
            imageUrl: data.imageUrl ?? "",
            secondText: data.secondText ?? "",
            enSecondText: data.enSecondText ?? "",
          });
        } else {
          setPartners(undefined);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchPartners function
    fetchPartners();
  }, []);

  return (
    <React.Fragment>
      {loading && <Loading />}
      <Box sx={{ maxWidth: "800px", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
        <Typography variant='h2'>
          <Translation tKey='partners.title' />
        </Typography>
        {!loading && partners === undefined && <PartnersDefault />}
        {!loading && partners !== undefined && <PartnersContent partners={partners} language={language} />}
      </Box>
    </React.Fragment>
  );
};

export default Partners;
