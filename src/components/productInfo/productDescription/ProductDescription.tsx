import { useContext } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { addProduct, removeProduct } from 'api/cart/cart';
import styles from 'components/productInfo/productDescription/productDescriptionStyle';
import productInfoContext from 'components/productInfo/ProductInfoContext';
import cartStore from 'store/slices/cart/cartSlice';
import notification from 'utils/notification';

const ProductDescription = (): JSX.Element | null => {
  const { cart, setCart } = cartStore((state) => state);
  const productInfo = useContext(productInfoContext);
  const masterData = productInfo?.masterData.current;

  if (!masterData) return null;

  let isInCart = false;
  let lineItemId: string | null = null;
  let inCartQuantity: number | null = null;

  if (cart?.lineItems.length) {
    for (let i = 0; i < cart?.lineItems?.length; i += 1) {
      if (cart?.lineItems[i].name['en-US'] === masterData.name['en-US']) {
        isInCart = true;
        break;
      }
    }

    for (let i = 0; i < cart.lineItems.length; i += 1) {
      if (cart.lineItems[i].productId === productInfo.id) {
        lineItemId = cart.lineItems[i].id;
        inCartQuantity = cart.lineItems[i].quantity;
        break;
      }
    }
  }

  const priceData = masterData.masterVariant.prices[0];
  const price = priceData.value;
  const priceDiscounted = priceData.discounted?.value;

  const handleRemoveFromCart = (): void => {
    if (cart) {
      if (!lineItemId || !inCartQuantity) return;

      removeProduct(cart.version, cart.id, lineItemId, inCartQuantity)
        .then((data) => {
          if (typeof data !== 'string') {
            setCart(data);
            notification('success', `${masterData.name['en-US']} was successfully removed from the cart!`);
          } else {
            notification('error', data);
          }
        })
        .catch((e) => e instanceof Error && notification('error', e.message));
    }
  };

  const handleAddToCart = (): void => {
    if (cart) {
      addProduct(cart.version, cart.id, productInfo.id, 1)
        .then((data) => {
          if (typeof data !== 'string') {
            setCart(data);
            notification('success', `${masterData.name['en-US']} was successfully added to the cart!`);
          } else {
            notification('error', data);
          }
        })
        .catch((e) => e instanceof Error && notification('error', e.message));
    }
  };

  return (
    <Box sx={styles.descriptionBox}>
      <Typography component='h2' variant='h4' sx={styles.name}>
        {masterData.name['en-US']}
      </Typography>
      <Box sx={styles.priceBox}>
        <Typography sx={priceDiscounted ? styles.currentPrice : { display: 'none' }}>
          {priceDiscounted?.centAmount.toLocaleString()} {priceDiscounted?.currencyCode}
        </Typography>
        <Typography sx={priceDiscounted ? styles.oldPrice : styles.currentPrice}>
          {price.centAmount.toLocaleString()} {price.currencyCode}
        </Typography>
      </Box>
      <Typography>{masterData.description['en-US']}</Typography>
      <Button
        variant='contained'
        color={isInCart ? 'secondary' : 'primary'}
        sx={styles.button}
        onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
      >
        {isInCart ? 'Remove from cart' : 'Add to cart'}
      </Button>
    </Box>
  );
};

export default ProductDescription;
