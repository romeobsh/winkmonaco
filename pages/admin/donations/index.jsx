import React from "react";
import TransferOrCheque from "@/components/donations/TransferOrCheque";
import { DonationsDatagrid } from "@/schemas/donationSchema";
import { Launch } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function AdminDonations({ paymentInfos }) {
  return (
    <React.Fragment>
      <DonationsDatagrid />
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
          <TransferOrCheque loading={false} data={paymentInfos} />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Typography color='' variant='h4' mb={3}>
            Version anglaise
          </Typography>
          <TransferOrCheque loading={false} data={paymentInfos} english />
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

export async function getServerSideProps() {
  try {
    const hostname = ctx.req.headers.host;

    const { data } = await (await fetch("http://" + hostname + `/api/paymentInfos`)).json();

    return {
      props: {
        paymentInfos: data[0] || {}, // Assuming data is an array and you need the first item
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        paymentInfos: {}, // Fallback empty object
      },
    };
  }
}
