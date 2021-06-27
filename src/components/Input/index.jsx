import React from 'react';

import { Box, TextField, Typography, MenuItem } from '@material-ui/core';

const Input = ({
  name,
  required = false,
  register,
  watch,
  fullWidth = true,
  label = '',
  errors,
  options,
  ...rest
}) => {
  const { ref, ...registerRest } = register(name);
  const isSelect = !!options;

  return (
    <Box>
      <Typography>{`${required ? '*' : ''} ${label}`}:</Typography>
      <TextField
        fullWidth={fullWidth}
        variant="outlined"
        inputRef={ref}
        {...registerRest}
        helperText={!!errors[name] && errors[name].message}
        select={isSelect}
        InputLabelProps={{ shrink: false }}
        label={watch(name) ? '' : label}
        {...rest}
      >
        {isSelect &&
          options.map(option => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
};

export default Input;
