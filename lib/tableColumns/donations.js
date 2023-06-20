import { Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { handleEditClick } from "../tablesHandleFunctions/handleEditClick";

export const donationsColumns = [
  { field: "fullName", headerName: "Nom Complet", flex: 3 },
  { field: "email", headerName: "Email", flex: 4 },
  { field: "amount", headerName: "Montant (€)", flex: 2 },
  { field: "type", headerName: "Type", type: "singleSelect", valueOptions: ["CB", "Abonnement", "Virement", "Chèque"], flex: 2 },
  { field: "dateTime", headerName: "Fait le", flex: 2, type: "dateTime", valueGetter: ({ value }) => value && new Date(value) },
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
