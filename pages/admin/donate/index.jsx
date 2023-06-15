import { useEffect, useState } from "react";
import { donationsColumns } from "@/lib/tableColumns/donations";
import { DataGrid } from "@mui/x-data-grid";
import { Box, LinearProgress } from "@mui/material";
import CustomDatagridToolbar from "@/components/datagrid/CustomDatagridToolbar";
import axios from "axios";

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
    <Box style={{ height: "100%", minHeight: "20rem", width: "100%", minWidth: "calc(100vw - 18rem)" }}>
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
    </Box>
  );
}
