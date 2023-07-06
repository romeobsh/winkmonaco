import TransferOrCheque from "@/components/donations/TransferOrCheque";
import { DonationsDatagrid } from "@/schemas/donation";
import { Launch } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function AdminDonations() {
  return (
    <React.Fragment>
      <DonationsDatagrid />
      <Grid container sx={{ paddingBottom: 3 }}>
        <Grid item xs={12}>
          <Typography variant='h3' mb={3}>
            Informations actuelles
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6} mb={3}>
          <Typography color='' variant='h4' mb={3}>
            Version française
          </Typography>
          <TransferOrCheque loading={false} />
        </Grid>
        <Grid item xs={12} lg={6} mb={3}>
          <Typography color='' variant='h4' mb={3}>
            Version anglaise
          </Typography>
          <TransferOrCheque loading={false} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h3' mt={5}>
            Modifications
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link href='/admin/donations/edit'>
            <Button variant='contained' startIcon={<Launch />} sx={{ mt: 2 }}>{`Modifier les informations de paiement`}</Button>
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

// {"_id":{"$oid":"64910ad6424adb51585a3a65"},"__v":{"$numberInt":"0"},"email":"winkmonaco@gmail.com","frTel":"06 58 82 26 89","fullName":"Thomas Rodier","internationalTel":"+33 6 58 82 26 89","profilePic":"https://drive.google.com/uc?export=view&id=19ySQnSLDw8yyxshfAaPsmh45l8pHAdQs","updatedAt":{"$date":{"$numberLong":"1688677178143"}}}
