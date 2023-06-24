import { Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { handleEditClick } from "../tables/handleEditClick";
import { statusOptions } from "../selectOptions/statusOptions";

export const subscriptionsColumns = [
  { field: "fullName", headerName: "Nom Complet", flex: 2 },
  { field: "email", headerName: "Email", flex: 3 },
  { field: "telephone", headerName: "Tel", flex: 2 },
  { field: "iban", headerName: "IBAN", flex: 4 },
  { field: "address", headerName: "Adresse", flex: 3 },
  { field: "additional", headerName: "Complément", flex: 2 },
  { field: "zipCode", headerName: "CP", flex: 1.5 },
  { field: "city", headerName: "Ville", flex: 1 },
  { field: "amount", headerName: "Montant", flex: 1 },
  {
    field: "status",
    headerName: "Type",
    type: "singleSelect",
    valueOptions: statusOptions.map((option) => option.value),
    flex: 3,
    valueGetter: (params) => {
      const { value } = params;
      const selectedOption = statusOptions.find((option) => option.value === value);
      return selectedOption ? selectedOption.label : "";
    },
  },
  { field: "comment", headerName: "Commentaires", flex: 3 },
  { field: "createdAt", headerName: "Créé le", flex: 2, type: "date", valueGetter: ({ value }) => value && new Date(value) },

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
    flex: 1,
  },
];
