import { translate } from "@/lib/translations/translate";
import { CheckCircle } from "@mui/icons-material";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const style = {
  position: "absolute",
  borderRadius: 4,
  top: "50%",
  left: "50%",
  textAlign: "center",
  justifyContent: "center",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  backgroundFilter: "blur(20px)",
  boxShadow: 24,
  p: 4,
};

const RecurringDonationSuccessModal = ({ opened, language }) => {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      closeAfterTransition
      open={opened}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={opened}>
        <Box sx={style}>
          <CheckCircle color='success' sx={{ fontSize: "4rem" }} />
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            {translate({ tKey: "donate.thankYou", lang: language })}
          </Typography>
          <Typography id='transition-modal-description' sx={{ mt: 1, mb: 1 }}>
            {translate({ tKey: "donate.info", lang: language })}{" "}
            <Link style={{ textDecoration: "none", color: "#22c6fe", fontWeight: 600 }} href='/contact'>
              {translate({ tKey: "nav.contact", lang: language })}
            </Link>
            .
          </Typography>
          <Typography display='inline' id='transition-modal-description'>
            {translate({ tKey: "donate.doNotCancel", lang: language })}
          </Typography>
          <Typography display='inline' color='secondary'>
            {translate({ tKey: "donate.doNotCancel2", lang: language })}
          </Typography>
          <Typography display='inline' id='transition-modal-description'>
            .
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default RecurringDonationSuccessModal;
