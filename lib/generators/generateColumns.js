import { Delete, Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { handleEditClick } from "../tables/handleEditClick";

export const generateColumns = (schema, handleDelete) => {
  const columns = schema.map((field) => {
    const column = {
      field: field.name,
      headerName: field.muiHeaderName,
      type: field.muiType || console.log("Unknown or undefined muiType for field " + field.name),
      flex: field.muiFlex,
      renderCell: field.muiRenderCell ?? null,
    };

    if (field.muiType === "date") {
      column.valueGetter = ({ value }) => value && new Date(value);
    }

    if (field.muiType === "singleSelect") {
      column.valueGetter = (params) => {
        const { value } = params;
        const selectedOption = field.selectOptions.find((option) => option.value === value);
        return selectedOption ? selectedOption.label : "";
      };

      column.selectOptions = field.selectOptions.map((option) => option.value);
    }

    return column;
  });

  columns.push({
    field: "actions",
    type: "actions",
    headerName: "Actions",
    flex: 1,
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem key={"edit" + id} icon={<Edit />} label='Modifier' className='textPrimary' onClick={() => handleEditClick(id)} color='inherit' />,
        <GridActionsCellItem
          key={"delete" + id}
          icon={<Delete color='error' />}
          label='Supprimer'
          className='textPrimary'
          onClick={() => handleDelete(id)}
          color='inherit'
        />,
      ];
    },
  });

  return columns;
};
