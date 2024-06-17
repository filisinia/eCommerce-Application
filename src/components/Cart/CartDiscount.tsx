import { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

import { textAndNumberValidate } from 'utils/validate';

const CartDiscount = (): JSX.Element => {
  const [discount, setDiscount] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => setDiscount(e.target.value);

  return (
    <Box component='form' sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField
        onChange={(e) => onChange(e)}
        label='Discount'
        name='discount'
        size='small'
        value={discount}
        error={!textAndNumberValidate(discount)}
        helperText={
          !textAndNumberValidate(discount) && 'Must contain at least one character or number and no special characters'
        }
      />
      <Button variant='contained' type='submit' sx={{ height: '2.5rem' }}>
        Add
      </Button>
    </Box>
  );
};

export default CartDiscount;
