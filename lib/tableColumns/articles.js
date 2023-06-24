import { Cancel, CheckCircle, Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { handleEditClick } from "../tables/handleEditClick";

export const articlesColumns = [
  { field: "title", headerName: "Titre", flex: 3 },
  { field: "content", headerName: "Contenu", flex: 5 },
  { field: "imageUrl", headerName: "URL Image", flex: 3 },
  { field: "createdAt", headerName: "Créé le", flex: 2, type: "date", valueGetter: ({ value }) => value && new Date(value) },
  {
    field: "priority",
    headerName: "Priorité",
    flex: 1.5,
    type: "boolean",
    renderCell: (params) =>
      params.row.priority ? <CheckCircle sx={{ color: "green", fontSize: "2rem" }} /> : <Cancel sx={{ color: "red", fontSize: "2rem" }} />,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem key={"edit" + id} icon={<Edit />} label='Edit' className='textPrimary' onClick={() => handleEditClick(id)} color='inherit' />,
      ];
    },
  },
];
