import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Select, Typography } from "@mui/material";
import { Launch } from "@mui/icons-material";
import PartnersContent from "@/components/partners/PartnersContent";
import Link from "next/link";
import { fetchData } from "@/lib/handlers/fetchData";
import SelectLanguage from "@/components/general/SelectLanguage";
import { LanguageContext } from "@/contexts/LanguageContext";

const AdminPartners = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData("partners", setIsLoading, setData, "singleDocument");
  }, []);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h3' mb={3}>
          Informations actuelles
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex" }}>
        <Typography color='' variant='h4' mr={2}>
          Version française
        </Typography>
        <SelectLanguage />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ maxWidth: "800px", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
          <PartnersContent partners={data} language={language} loading={isLoading} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h3' mt={2}>
          Modifications
        </Typography>
      </Grid>
      <Grid item xs={12} mb={5}>
        <Link href='/admin/partners/edit'>
          <Button variant='contained' startIcon={<Launch />} sx={{ mt: 2 }}>{`Modifier la page Partenaires`}</Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default AdminPartners;
