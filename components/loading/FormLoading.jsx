import { Skeleton, Stack } from "@mui/material";
import React from "react";

const FormLoading = () => {
  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Skeleton variant='text' animation='wave' height={90} />
      <Skeleton variant='rectangular' animation='wave' height={140} />
      <Skeleton variant='text' animation='wave' height={90} />
      <Skeleton variant='text' animation='wave' height={90} />
      <div style={{ display: "flex" }}>
        <Skeleton variant='text' animation='wave' height={70} width={150} sx={{ mt: 2 }} />
        <Skeleton variant='text' animation='wave' height={70} width={150} sx={{ mt: 2, ml: 2 }} />
      </div>
    </Stack>
  );
};

export default FormLoading;
