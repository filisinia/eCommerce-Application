import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Grid, IconButton } from '@mui/material';

import { IProductCart } from 'types/cart';
import formatNumber from 'utils/formatNumber';
import notification from 'utils/notification';

const CartItem = ({
  product,
  increaseQuantity,
  decreaseQuantity,
}: {
  product: IProductCart;
  increaseQuantity: (productId: string) => Promise<void>;
  decreaseQuantity: (lineItemId: string, quantity: number) => Promise<void>;
}): JSX.Element => {
  const { name, totalPrice, quantity, variant, productId, id } = product;

  const totalProductPrice = quantity * totalPrice.centAmount;

  const increaseProductQuantity = (): void => {
    increaseQuantity(productId).catch((e: Error) => notification('error', e.message));
  };

  const decreseProductQuantity = (): void => {
    decreaseQuantity(id, 1).catch((e: Error) => notification('error', e.message));
  };

  const removeProduct = (): void => {
    decreaseQuantity(id, quantity).catch((e: Error) => notification('error', e.message));
  };

  return (
    <Grid component='li' item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} xs={12}>
      <h3>{name['en-US']}</h3>

      <img src={variant.images[0].url} alt={name['en-US']} style={{ width: '10rem', height: '10rem' }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button onClick={decreseProductQuantity}>-</Button>
        <span>{quantity}</span>
        <Button onClick={increaseProductQuantity}>+</Button>
      </Box>
      <p>
        <span>{formatNumber.format(totalProductPrice)} $ </span>
      </p>
      <IconButton onClick={removeProduct}>
        <ClearIcon />
      </IconButton>
    </Grid>
  );
};

export default CartItem;
