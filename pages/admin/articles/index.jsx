import { useEffect, useState } from "react";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Add, Cancel, Delete, Edit, Save } from "@mui/icons-material";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<Add />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [batchChanges, setBatchChanges] = useState([]);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "title", headerName: "Titre", flex: 3, editable: true },
    { field: "content", headerName: "Contenu", flex: 5, editable: true },
    { field: "imageUrl", headerName: "URL Image", flex: 3, editable: true },
    { field: "createdAt", headerName: "Créé le", flex: 2, editable: true, type: "date", valueGetter: ({ value }) => value && new Date(value) },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem key={1} icon={<Save />} label='Save' onClick={handleSaveClick(id)} />,
            <GridActionsCellItem key={2} icon={<Cancel />} label='Cancel' className='textPrimary' onClick={handleCancelClick(id)} color='inherit' />,
          ];
        }

        return [
          <GridActionsCellItem key={3} icon={<Edit />} label='Edit' className='textPrimary' onClick={handleEditClick(id)} color='inherit' />,
          <GridActionsCellItem key={4} icon={<Delete />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />,
        ];
      },
    },
  ];

  useEffect(() => {
    // Fetch articles from the API and set the articles state
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles/view");
        const { data: data } = await response.json();
        console.log(data);
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    // Batch changes and send API request after a delay
    const delay = 1000; // Adjust the delay as needed
    const timer = setTimeout(() => {
      if (batchChanges.length > 0) {
        updateCells();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [batchChanges]);

  const updateCells = async () => {
    try {
      const updatedArticles = articles.map((article) => {
        const batchChange = batchChanges.find((change) => change.id === article.id);
        return batchChange ? { ...article, ...batchChange.changes } : article;
      });

      await fetch("/api/articles/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArticles),
      });

      setArticles(updatedArticles);
      setBatchChanges([]);
    } catch (error) {
      console.error("Error updating articles:", error);
    }
  };

  const handleEditCellChange = (params) => {
    const { id, field, value } = params;
    const change = { id, changes: { [field]: value } };
    const existingChangeIndex = batchChanges.findIndex((change) => change.id === id);

    if (existingChangeIndex !== -1) {
      const updatedChanges = [...batchChanges];
      updatedChanges[existingChangeIndex] = change;
      setBatchChanges(updatedChanges);
    } else {
      setBatchChanges((prevChanges) => [...prevChanges, change]);
    }
  };

  const handleAddRow = async (newRow) => {
    try {
      const response = await fetch("/api/articles/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      });
      const createdArticle = await response.json();
      setArticles((prevArticles) => [...prevArticles, createdArticle]);
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  const handleDeleteRows = async (selectedRows) => {
    try {
      await Promise.all(
        selectedRows.map(async (row) => {
          await fetch(`/api/articles/delete?id=${row.id}`, {
            method: "DELETE",
          });
        })
      );
      setArticles((prevArticles) => prevArticles.filter((article) => !selectedRows.find((row) => row.id === article.id)));
    } catch (error) {
      console.error("Error deleting articles:", error);
    }
  };

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <Box style={{ height: "100%", minHeight: "20rem", width: "100%", minWidth: "calc(100vw - 288px)" }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={articles}
        columns={columns}
        pageSize={10}
        // disableSelectionOnClick
        // onEditCellChangeCommitted={handleEditCellChange}
        // components={{
        //   Toolbar: GridToolbar,
        // }}
        // onAddRow={handleAddRow}
        // onDeleteRows={handleDeleteRows}

        editMode='row'
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setArticles, setRowModesModel },
        }}
      />
    </Box>
  );
}
