import { Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { handleEditClick } from "../tablesHandleFunctions/handleEditClick";

export const volunteersColumns = [
  { field: "firstName", headerName: "Prénom", flex: 1.5 },
  { field: "lastName", headerName: "Nom", flex: 1.5 },
  { field: "telephone", headerName: "Téléphone", flex: 1.5 },
  { field: "email", headerName: "Email", flex: 3 },
  { field: "job", headerName: "Profession", flex: 1.5 },
  { field: "address", headerName: "Adresse", flex: 4 },
  { field: "comment", headerName: "Commentaires", flex: 4 },
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
