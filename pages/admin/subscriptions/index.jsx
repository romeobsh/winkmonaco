import React, { useEffect, useState } from "react";
import { subscriptionsColumns } from "@/lib/tableColumns/subscriptions";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CustomDatagridToolbar from "@/components/datagrid/CustomDatagridToolbar";
import axios from "axios";

export default function AdminDonate() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/subscriptions/view");
        setSubscriptions(res.data.data);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Box style={{ height: "30rem", minHeight: "20rem", width: "100%", minWidth: "calc(100vw - 18rem)" }}>
        <Typography variant='h2'>Abonnements</Typography>
        <DataGrid
          getRowId={(row) => row._id}
          rows={subscriptions}
          columns={subscriptionsColumns}
          pageSize={10}
          slots={{
            toolbar: CustomDatagridToolbar,
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                createdAt: false,
                email: false,
                address: false,
                additional: false,
                zipCode: false,
                city: false,
              },
            },
          }}
        />
        <Box>
          <Typography variant='h2' sx={{ mt: 5 }}>
            Stats générales
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
}
