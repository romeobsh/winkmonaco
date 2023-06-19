import CustomDatagridToolbar from "@/components/datagrid/CustomDatagridToolbar";
import { volunteersColumns } from "@/lib/tableColumns/volunteers";
import { Launch } from "@mui/icons-material";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Help = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/volunteers/view`);
        let data = await res.json();
        setVolunteers(data.data ?? []);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Box style={{ minHeight: "30rem", height: "50%", minWidth: "calc(100vw - 18rem)" }}>
        <Typography variant='h2'>Volontaires</Typography>
        <DataGrid
          getRowId={(row) => row._id}
          rows={volunteers}
          columns={volunteersColumns}
          pageSize={10}
          slots={{
            toolbar: CustomDatagridToolbar,
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
        />
      </Box>
      <Box>
        <Typography variant='h2' sx={{ mt: 5 }}>
          Modifications du site
        </Typography>
        <Link href='/admin/help/edit/helpTexts'>
          <Button variant='contained' startIcon={<Launch />} sx={{ mt: 2 }}>{`Modifier le contenu de la page "Aider autrement"`}</Button>
        </Link>
      </Box>
    </React.Fragment>
  );
};

export default Help;
