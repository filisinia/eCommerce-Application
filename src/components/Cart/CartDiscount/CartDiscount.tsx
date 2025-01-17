import { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

import 'components/Cart/CartDiscount/CartDiscountStyle.scss';

import { fetchDiscountCodes } from 'api/cart/discount';
import cartStore from 'store/slices/cart/cartSlice';
import { ICartDiscount } from 'types/cart';
import { eraseCookie, getCookie, setCookie } from 'utils/getCoockie';
import notification from 'utils/notification';
import { textAndNumberValidate } from 'utils/validate';

const CartDiscount = (): JSX.Element => {
  const [discount, setDiscount] = useState<string>('');
  const { cart, setCart } = cartStore((state) => state);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => setDiscount(e.target.value);

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!discount) return;

    fetchDiscountCodes()
      .then((data) => {
        if (typeof data !== 'string') {
          const isValidCode = data.some((promo: ICartDiscount): boolean => promo.code === discount);

          if (isValidCode && cart) {
            notification('success', 'Code is valid');

            setCookie('discount', discount);
          } else {
            const discountCoockie = getCookie('discount');

            if (discountCoockie) eraseCookie('discount');

            notification('error', 'Invalid code');
          }
          setCart(cart);
        } else notification('error', data);
      })
      .catch((err: Error) => notification('error', err.message));

    setDiscount('');
  };

  return (
    <Box className='discount' component='form' onSubmit={onSubmit}>
      <TextField
        className='discount__input'
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
      <Button variant='contained' type='submit' className='discount__button'>
        Add
      </Button>
    </Box>
  );
};

export default CartDiscount;
