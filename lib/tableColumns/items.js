import { Delete, Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { handleEditClick } from "../tablesHandleFunctions/handleEditClick";

export const itemsColumns = [
  { field: "name", headerName: "Nom", flex: 3 },
  { field: "description", headerName: "description", flex: 5 },
  { field: "imageUrl", headerName: "URL Image", flex: 3 },
  { field: "price", headerName: "Prix", flex: 2, type: "number" },
  { field: "sizes", headerName: "Tailles", flex: 2, type: "number" },
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
