import React, { useEffect, useState } from "react";
import { donationsColumns } from "@/lib/tableColumns/donations";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CustomDatagridToolbar from "@/components/datagrid/CustomDatagridToolbar";
import axios from "axios";
import { Launch } from "@mui/icons-material";
import Link from "next/link";

export default function AdminDonate() {
  const [donations, setdonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/donations/view");
        setdonations(res.data.data);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Box style={{ height: "25rem", minHeight: "20rem", width: "100%", minWidth: "calc(100vw - 18rem)" }}>
        <Typography variant='h2'>Dons ponctuels</Typography>
        <DataGrid
          getRowId={(row) => row._id}
          rows={donations}
          columns={donationsColumns}
          pageSize={10}
          slots={{
            toolbar: CustomDatagridToolbar,
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
        />
        <Box>
          <Typography variant='h2' sx={{ mt: 5 }}>
            Modifier les informations de paiement
          </Typography>
          <Typography>{`En cas de changement d'IBAN, d'adresse, ...`}</Typography>
          <Link href='/admin/donations/paymentInfo'>
            <Button variant='contained' startIcon={<Launch />} sx={{ mt: 2 }}>{`Modifier les informations de paiement`}</Button>
          </Link>
        </Box>
      </Box>
    </React.Fragment>
  );
}
