import { ChangeEvent, FC } from 'react';

import { TextField } from '@mui/material';

interface IPriceValueInput {
  label: 'min' | 'max';
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PriceValueInput: FC<IPriceValueInput> = ({ label, value, onChange }): JSX.Element => (
  <TextField
    size='small'
    label={label}
    type='number'
    variant='outlined'
    InputLabelProps={{ shrink: true }}
    sx={{ width: '100px' }}
    value={value}
    onChange={onChange}
  />
);

export default PriceValueInput;
