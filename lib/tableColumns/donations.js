import { Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { handleEditClick } from "../tables/handleEditClick";
import { typeOptions } from "../selectOptions/typeOptions";

export const donationsColumns = [
  { field: "fullName", headerName: "Nom Complet", flex: 3 },
  { field: "email", headerName: "Email", flex: 4 },
  { field: "amount", headerName: "Montant (€)", flex: 2 },
  {
    field: "type",
    headerName: "Type",
    type: "singleSelect",
    valueGetter: (params) => {
      const { value } = params;
      const selectedOption = typeOptions.find((option) => option.value === value);
      return selectedOption ? selectedOption.label : "";
    },
    valueOptions: typeOptions.map((option) => option.value),
    flex: 2,
  },
  { field: "createdAt", headerName: "Fait le", flex: 2, type: "date", valueGetter: ({ value }) => value && new Date(value) },
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
