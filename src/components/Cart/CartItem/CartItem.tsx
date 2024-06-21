import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Grid, IconButton } from '@mui/material';

import 'components/products/ProductsItem/ProductItemStyle.scss';
import 'components/Cart/CartItem/CartItemStyle.scss';

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
    <Grid className='cart' component='li' item xs={12}>
      <Box className='cart__image'>
        <img src={variant.images[0].url} alt={name['en-US']} style={{ width: '10rem', height: '10rem' }} />
      </Box>
      <h3 className='cart__name'>{name['en-US']}</h3>
      <Box className='cart__active'>
        <Box className='cart__quantity'>
          <IconButton onClick={decreaseProductQuantity}>
            <RemoveCircleIcon color='primary' />
          </IconButton>
          <span>{quantity}</span>
          <IconButton onClick={increaseProductQuantity}>
            <AddCircleIcon color='primary' />
          </IconButton>
        </Box>
        <p className='cart__price'>
          {isActive && (
            <span className='product__price' style={{ textAlign: 'center' }}>
              {discountPrice} $
              <br />
            </span>
          )}
          <span className={isActive ? 'product__price product__discount' : 'product__price'}>
            {formatNumber.format(totalProductPrice)} $
          </span>
        </p>
        <IconButton onClick={removeProduct} className='cart__button'>
          <DeleteIcon sx={{ color: 'rgb(199, 0, 57)' }} />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default CartItem;
