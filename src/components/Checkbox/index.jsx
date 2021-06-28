import React from 'react';

import { FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

const Checkbox = ({ checked, label = '', register, name }) => {
  const { ref, ...registerRest } = register(name);

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          color="primary"
          {...registerRest}
          inputRef={ref}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
