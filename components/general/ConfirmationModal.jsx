import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  borderRadius: 4,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ConfirmationModal = (props) => {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      onClose={props.handleClose}
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
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            {props.title}
          </Typography>
          <Typography id='transition-modal-description' sx={{ mt: 2 }}>
            {props.text}
          </Typography>
          <Button variant='contained' onClick={props.onConfirm} color='error' sx={{ mt: 2 }}>
            {props.cancelModal ? "Oui, annuler" : "Supprimer"}
          </Button>
          <Button variant='text' color='primary' sx={{ ml: 3, mt: 2 }} onClick={props.handleClose}>
            {props.cancelModal ? "Non, continuer" : "Annuler"}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmationModal;
