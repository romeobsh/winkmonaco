import { CheckCircle } from "@mui/icons-material";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  maxWidth: "90%",
  borderRadius: 4,
  top: "50%",
  left: "50%",
  textAlign: "center",
  justifyContent: "center",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  backgroundFilter: "blur(20px)",
  boxShadow: 24,
  p: 4,
};

const SuccessModal = (props) => {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      closeAfterTransition
      open={props.opened}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={props.opened}>
        <Box sx={style}>
          <CheckCircle color='success' sx={{ fontSize: "4rem" }} />
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            {props.title}
          </Typography>
          <Typography id='transition-modal-description' sx={{ mt: 1 }}>
            {props.text}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SuccessModal;
