import React, { useContext } from "react";
import { VolunteersDatagrid } from "@/schemas/volunteer";
import { Box, Button, Grid, Typography } from "@mui/material";
import SelectLanguage from "@/components/general/SelectLanguage";
import { LanguageContext } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Launch } from "@mui/icons-material";
import VolunteersContent from "@/components/volunteers/VolunteersContent";

export default function AdminVolunteers({ data }) {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <VolunteersDatagrid />
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
          <Box sx={{ maxWidth: { xs: "600px", lg: "1200px" }, margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
            <VolunteersContent data={data} language={language} loading={false} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h3' mt={2}>
            Modifications
          </Typography>
        </Grid>
        <Grid item xs={12} mb={5}>
          <Link href='/admin/volunteers/edit'>
            <Button variant='contained' startIcon={<Launch />} sx={{ mt: 2 }}>{`Modifier la page Aider autrement`}</Button>
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await (await fetch(`http://localhost:3003/api/helpContents`)).json();

    return {
      props: {
        data: data[0] || {}, // Assuming data is an array and you need the first item
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: {}, // Fallback empty object
      },
    };
  }
}
