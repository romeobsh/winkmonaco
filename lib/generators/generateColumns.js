import { Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { handleEditClick } from "../tables/handleEditClick";

export const generateColumns = (model) => {
  const columns = model.map((field) => {
    const column = {
      field: field.name,
      headerName: field.muiHeaderName,
      flex: field.muiFlex,
      renderCell: field.muiRenderCell ?? null,
    };

    if (field.muiType === "string") {
      column.type = "string";
    } else if (field.muiType === "date") {
      column.type = "date";
      column.valueGetter = ({ value }) => value && new Date(value);
    } else if (field.muiType === "boolean") {
      column.type = "boolean";
    } else if (field.muiType === "singleSelect") {
      column.type = "singleSelect";
      column.valueGetter = (params) => {
        const { value } = params;
        const selectedOption = field.selectOptions.find((option) => option.value === value);
        return selectedOption ? selectedOption.label : "";
      };

      column.selectOptions = field.selectOptions.map((option) => option.value);
    } else {
      console.log("Unknown or undefined muiType for field " + field.name);
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
        <GridActionsCellItem key={"edit" + id} icon={<Edit />} label='Edit' className='textPrimary' onClick={() => handleEditClick(id)} color='inherit' />,
      ];
    },
  });

  return columns;
};
