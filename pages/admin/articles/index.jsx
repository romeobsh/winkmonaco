import { useEffect, useState } from "react";
import { articlesColumns } from "@/schemas/article";
import { DataGrid } from "@mui/x-data-grid";
import { Box, LinearProgress, Typography } from "@mui/material";
import CustomDatagridToolbar from "@/components/datagrid/CustomDatagridToolbar";
import axios from "axios";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/articles");
        setArticles(res.data.data);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Box style={{ height: "100%", minHeight: "20rem", width: "100%", minWidth: "calc(100vw - 18rem)" }}>
      <Typography variant='h2'>Articles</Typography>
      <DataGrid
        getRowId={(row) => row._id}
        rows={articles}
        columns={articlesColumns}
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