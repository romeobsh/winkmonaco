import { Delete, Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";

export const articlesColumns = [
  { field: "_id", headerName: "ID", flex: 1 },
  { field: "title", headerName: "Titre", flex: 3 },
  { field: "content", headerName: "Contenu", flex: 5 },
  { field: "imageUrl", headerName: "URL Image", flex: 3 },
  { field: "createdAt", headerName: "Créé le", flex: 2, type: "date", valueGetter: ({ value }) => value && new Date(value) },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem key={"edit" + id} icon={<Edit />} label='Edit' className='textPrimary' onClick={handleEditClick(id)} color='inherit' />,
        <GridActionsCellItem key={"delete" + id} icon={<Delete />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />,
      ];
    },
  },
];
