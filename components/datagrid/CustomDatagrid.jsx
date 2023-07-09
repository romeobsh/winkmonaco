import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, LinearProgress, Typography } from "@mui/material";
import { deletionHandler } from "@/lib/handlers/deletionHandler";
import { generateColumns } from "@/lib/generators/generateColumns";
import CustomDatagridToolbar from "./CustomDatagridToolbar";
import ConfirmationModal from "../general/ConfirmationModal";

export default function CustomDatagrid({ endpoint, schema, title }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  const handleDelete = (id) => {
    setSelectedRow(id);
    setIsOpened(true);
  };

  const handleClose = () => {
    setSelectedRow(null);
    setIsOpened(false);
  };

  const confirmDelete = () => {
    deletionHandler(selectedRow, endpoint, setIsLoading, handleClose);
    setData(data.filter((item) => item._id !== selectedRow));
    setIsOpened(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await (await fetch(`/api/${endpoint}`)).json();
        setData(data);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [endpoint]);

  const initialState = {
    columns: {
      columnVisibilityModel: {},
    },
  };

  // Constructing the column visibility model based on the schema
  schema.forEach((column) => {
    if (column.muiHidden) {
      initialState.columns.columnVisibilityModel[column.name] = false;
    }
  });

  return (
    <Box>
      <ConfirmationModal
        onConfirm={confirmDelete}
        opened={isOpened}
        handleClose={handleClose}
        title='Suppression'
        text='Êtes-vous sur de vouloir supprimer cet élément de la base de données?'
      />
      <Typography variant='h3'>{title}</Typography>
      <Box sx={{ minHeight: "30rem", height: "40rem", maxHeight: "calc(100vh - 72px)" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={data}
          columns={generateColumns(schema, handleDelete)}
          pageSize={10}
          slots={{
            toolbar: CustomDatagridToolbar,
            loadingOverlay: LinearProgress,
          }}
          loading={isLoading}
          initialState={initialState}
        />
      </Box>
    </Box>
  );
}
