import { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

import { fetchDiscountCodes } from 'api/cart/discount';
import { ICartDiscount } from 'types/cart';
import notification from 'utils/notification';
import { textAndNumberValidate } from 'utils/validate';

const CartDiscount = (): JSX.Element => {
  const [discount, setDiscount] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => setDiscount(e.target.value);

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    fetchDiscountCodes()
      .then((data) => {
        if (typeof data !== 'string') {
          const isValidCode = data.some((promo: ICartDiscount): boolean => promo.code === discount);

          isValidCode ? notification('success', 'Code is valid') : notification('error', 'Invalid code');
        } else {
          notification('error', data);
        }
      })
      .catch((err: Error) => notification('error', err.message));

    setDiscount('');
  };

  return (
    <Box component='form' sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }} onSubmit={onSubmit}>
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
