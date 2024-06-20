import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Grid, IconButton } from '@mui/material';

import 'components/products/ProductsItem/ProductItemStyle.scss';

import { IProductCart } from 'types/cart';
import formatNumber from 'utils/formatNumber';
import notification from 'utils/notification';

const CartItem = ({
  product,
  increaseQuantity,
  decreaseQuantity,
  isDiscoundActive,
}: {
  product: IProductCart;
  increaseQuantity: (productId: string) => Promise<void>;
  decreaseQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  isDiscoundActive: boolean;
}): JSX.Element => {
  const { name, quantity, variant, productId, id, price } = product;

  const totalProductPrice = quantity * price.value.centAmount;

  let discountPrice: number | null = null;

  if (price.discounted) {
    discountPrice = quantity * price.discounted.value.centAmount;
  }

  const isActive = isDiscoundActive && discountPrice;

  const increaseProductQuantity = (): void => {
    increaseQuantity(productId).catch((e: Error) => notification('error', e.message));
  };

  const decreaseProductQuantity = (): void => {
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
        <Button onClick={decreaseProductQuantity}>-</Button>
        <span>{quantity}</span>
        <Button onClick={increaseProductQuantity}>+</Button>
      </Box>
      <p>
        {isActive && (
          <span className='product__price' style={{ textAlign: 'center' }}>
            {discountPrice}
            <br />
          </span>
        )}
        <span className={isActive ? 'product__price product__discount' : 'product__price'}>
          {formatNumber.format(totalProductPrice)} $
        </span>
      </p>
      <IconButton onClick={removeProduct}>
        <ClearIcon />
      </IconButton>
    </Grid>
  );
};

export default CartItem;
