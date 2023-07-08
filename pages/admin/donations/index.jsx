import React, { useEffect, useState } from "react";
import TransferOrCheque from "@/components/donations/TransferOrCheque";
import { DonationsDatagrid } from "@/schemas/donation";
import { Launch } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { fetchData } from "@/lib/handlers/fetchData";

export default function AdminDonations() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData("paymentInfos", setIsLoading, setData, "singleDocument");
  }, []);

  return (
    <React.Fragment>
      {/* <DonationsDatagrid /> */}
      <Typography variant='h2' color='secondary'>
        DATAGRID A REMETTRE (PB DOUBLE API CALL)
      </Typography>
      <Grid container sx={{ paddingBottom: 3 }}>
        <Grid item xs={12}>
          <Typography variant='h3' mb={3}>
            Informations actuelles
          </Typography>
        </Grid>
        <Grid item xs={12} mb={5}>
          <Typography color='' variant='h4' mb={3}>
            Version française
          </Typography>
          <TransferOrCheque loading={isLoading} data={data} />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Typography color='' variant='h4' mb={3}>
            Version anglaise
          </Typography>
          <TransferOrCheque loading={isLoading} data={data} english />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h3' mt={5}>
            Modifications
          </Typography>
        </Grid>
        <Grid item xs={12} mb={3}>
          <Link href='/admin/donations/edit'>
            <Button variant='contained' startIcon={<Launch />} sx={{ mt: 2 }}>{`Modifier les informations de paiement`}</Button>
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
