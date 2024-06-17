import { useState } from 'react';

import { Box, Button, Grid } from '@mui/material';

import { IProductCart } from 'types/cart';

const CartItem = ({ product }: { product: IProductCart }): JSX.Element => {
  const { name, totalPrice, quantity, variant, productId } = product;
  const [productQuantity, setProductQuantity] = useState<number>(quantity);

  const totalProductsPrice = productQuantity * totalPrice.centAmount;

  return (
    <Grid component='li' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} xs={12}>
      <h3>{name['en-US']}</h3>

      <img src={variant.images[0].url} alt={name['en-US']} style={{ width: '10rem', height: '10rem' }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button onClick={() => (productQuantity === 0 ? undefined : setProductQuantity(productQuantity - 1))}>-</Button>
        <span>{productQuantity}</span>
        <Button onClick={() => setProductQuantity(productQuantity + 1)}>+</Button>
      </Box>
      <p>
        Total: <span>{totalProductsPrice} $ </span>
      </p>
    </Grid>
  );
};

export default CartItem;
