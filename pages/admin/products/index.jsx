import React from "react";
import { ProductsDatagrid } from "@/schemas/product";
import { Typography } from "@mui/material";

export default function AdminProduct() {
  return (
    <React.Fragment>
      <ProductsDatagrid />
      <Typography variant='h3'>Rappel</Typography>
      <Typography variant='body1'>
        Pour désactiver le shop, <b>désactiver tous les articles</b>
      </Typography>
      <Typography variant='body1'>
        Une autre page apparaîtra automatiquement à la place du shop, indiquant que celui-ci est indisponible pour le moment.
      </Typography>
    </React.Fragment>
  );
}
