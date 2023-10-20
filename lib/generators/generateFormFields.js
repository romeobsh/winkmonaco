import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, FormGroup, MenuItem, Typography, Box } from '@mui/material';
import { Translate } from '@mui/icons-material';

export const generateFormFields = (schema, isSending, values, errors, touched, handleChange) => {
  return schema.map((field) => {
    const {
      name,
      title,
      placeholder,
      translation,
      muiHeaderName,
      muiType,
      muiMdSize,
      selectOptions,
      fullWidth,
      multiline,
      minRows,
      disabled,
      label,
      autocorrect,
    } = field;

    if (muiType === 'string' || muiType === 'date' || muiType === 'number') {
      return (
        <Grid item xs={12} md={muiMdSize ?? 12} key={name}>
          {title && (
            <Typography mt={2} mb={2}>
              {title}
            </Typography>
          )}
          <TextField
            fullWidth={fullWidth ?? true}
            label={
              translation ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Translate sx={{ color: 'black', marginRight: '0.5rem' }} fontSize='small' />
                  {muiHeaderName}
                </Box>
              ) : (
                muiHeaderName
              )
            }
            name={name}
            type={muiType === 'number' ? 'number' : 'text'}
            value={
              muiType === 'string' || muiType === 'number'
                ? values[name] || ''
                : new Date(values[name]).toLocaleDateString() || ''
            }
            onChange={handleChange}
            error={touched[name] && !!errors[name]}
            helperText={touched[name] && errors[name]}
            multiline={multiline}
            minRows={multiline && minRows ? minRows : 1}
            maxRows={12}
            disabled={isSending || disabled}
            placeholder={placeholder}
            autoCorrect={autocorrect ?? 'on'}
          />
        </Grid>
      );
    } else if (muiType === 'boolean') {
      return (
        <Grid item xs={12} md={muiMdSize ?? 6} key={name}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              value={values[name] || false}
              checked={values[name] || false}
              label={label ?? muiHeaderName}
              name={name}
              onChange={handleChange}
              disabled={isSending || disabled}
            />
          </FormGroup>
        </Grid>
      );
    } else if (muiType === 'singleSelect' && selectOptions) {
      return (
        <Grid item xs={12} md={muiMdSize ?? 6} key={name}>
          <TextField
            fullWidth={fullWidth ?? true}
            select
            label={muiHeaderName}
            name={name}
            value={values[name] || ''}
            onChange={handleChange}
            error={touched[name] && !!errors[name]}
            helperText={touched[name] && errors[name]}
            disabled={isSending || disabled}
          >
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
