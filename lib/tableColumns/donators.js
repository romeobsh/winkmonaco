import { Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { handleEditClick } from "../tablesHandleFunctions/handleEditClick";

export const donatorsColumns = [
  { field: "_id", headerName: "ID", flex: 1 },
  { field: "fullName", headerName: "Nom Complet", flex: 2 },
  { field: "email", headerName: "Email", flex: 3 },
  { field: "iban", headerName: "IBAN", flex: 4 },
  { field: "amount", headerName: "Montant", flex: 3 },
  { field: "status", headerName: "Type", type: "singleSelect", valueOptions: ["Demande d'abonnement", "Abonné", "Demande de résiliation", "Résilié"], flex: 2 },
  { field: "dateTime", headerName: "Créé le", flex: 2, type: "dateTime", valueGetter: ({ value }) => value && new Date(value) },
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
