import React from 'react';
import { EmailsDatagrid } from '@/schemas/emailSchema';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { Launch } from '@mui/icons-material';

const Emails = () => {
  return (
    <React.Fragment>
      <EmailsDatagrid />
      <Typography variant='h3' mt={5}>
        Envoyer un nouvel email de masse
      </Typography>
      <Link href='/admin/emails/send'>
        <Button variant='contained' startIcon={<Launch />} sx={{ mt: 2 }}>{`Interface d'envoi d'emails`}</Button>
      </Link>
    </React.Fragment>
  );
};

export default Emails;
