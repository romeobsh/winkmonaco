import { Grid, TextField, Checkbox, FormControlLabel, FormGroup, MenuItem } from "@mui/material";

export const generateFormFields = (schema, values, errors, touched, handleChange) => {
  return schema.map((field) => {
    const { name, placeholder, muiHeaderName, muiType, muiMdSize, selectOptions, fullWidth, multiline, minRows, disabled } = field;

    if (muiType === "string" || muiType === "date") {
      return (
        <Grid item xs={12} md={muiMdSize ?? 12} key={name}>
          <TextField
            fullWidth={fullWidth ?? true}
            label={muiHeaderName}
            name={name}
            value={muiType === "string" ? values[name] : new Date(values[name]).toLocaleDateString()}
            onChange={handleChange}
            error={touched[name] && !!errors[name]}
            helperText={touched[name] && errors[name]}
            multiline={multiline}
            rows={multiline && minRows ? minRows : 1}
            disabled={disabled}
            placeholder={placeholder}
          />
        </Grid>
      );
    } else if (muiType === "checkbox") {
      return (
        <Grid item xs={12} md={muiMdSize ?? 6} key={name}>
          <FormGroup>
            <FormControlLabel checked={values[name]} control={<Checkbox />} value={values[name]} label={muiHeaderName} name={name} onChange={handleChange} />
          </FormGroup>
        </Grid>
      );
    } else if (muiType === "singleSelect" && selectOptions) {
      return (
        <Grid item xs={12} md={muiMdSize ?? 6} key={name}>
          <TextField
            select
            fullWidth={fullWidth ?? true}
            label={muiHeaderName}
            name={name}
            value={values[name]}
            onChange={handleChange}
            error={touched[name] && !!errors[name]}
            helperText={touched[name] && errors[name]}>
            {selectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      );
    } else {
      return null;
    }
  });
};
