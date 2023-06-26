import { useEffect, useState } from "react";
import { articlesColumns } from "@/schemas/article";
import { DataGrid } from "@mui/x-data-grid";
import { Box, LinearProgress, Typography } from "@mui/material";
import CustomDatagridToolbar from "@/components/datagrid/CustomDatagridToolbar";
import axios from "axios";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import { deletionHandler } from "@/lib/handlers/deletionHandler";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState("");

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

  const handleDelete = (id) => {
    setIsOpened(false);
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  const confirmDelete = (id) => {
    deletionHandler(id, "articles", setLoading, handleClose);
  };

  return (
    <Box style={{ height: "100%", minHeight: "20rem", width: "100%", minWidth: "calc(100vw - 272px)" }}>
      <ConfirmationModal
        handleDelete={() => confirmDelete(isOpened)}
        opened={isOpened}
        handleClose={() => handleClose}
        title="Suppression d'un don"
        text='Êtes-vous sur de vouloir supprimer ce don de la base de données?'
      />
      <Typography variant='h2'>Articles</Typography>
      <DataGrid
        getRowId={(row) => row._id}
        rows={articles}
        columns={articlesColumns(handleDelete)}
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
