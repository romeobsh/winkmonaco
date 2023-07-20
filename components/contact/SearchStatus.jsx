import { Cancel, Check, Info } from "@mui/icons-material";
import { CircularProgress, Collapse, Grid, Typography } from "@mui/material";
import React from "react";

const SearchStatus = ({ subscription, notFound, isSearching }) => {
  return (
    <Grid item xs={12} mt={3}>
      <Collapse in={subscription === null && !isSearching && !notFound}>
        <Info sx={{ fontSize: 50 }} color='info' />
        <Typography>{`Rentrez l'IBAN associé à votre don récurrent pour activer les options ci-dessous`}</Typography>
      </Collapse>
      <Collapse in={isSearching}>
        <CircularProgress size={50} />
        <Typography>Searching...</Typography>
      </Collapse>
      <Collapse in={notFound}>
        <Cancel sx={{ fontSize: 50 }} color='error' />
        <Typography>Aucun don récurrent associé à cet IBAN</Typography>
      </Collapse>
      <Collapse in={subscription !== null}>
        <Check sx={{ fontSize: 50 }} color='success' />
        <Typography>Don récurrent associé à cet IBAN trouvé</Typography>
      </Collapse>
    </Grid>
  );
};

export default SearchStatus;
