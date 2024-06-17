import { useLayoutEffect } from 'react';

import { Grid } from '@mui/material';

import CartItem from './CartItem';

import { fetchCart, addProduct, removeProduct } from 'api/cart/cart';
import cartStore from 'store/slices/cart/cartSlice';
import getCartTotalPrice from 'utils/getCarTotalPrice';
import notification from 'utils/notification';

const Cart = (): JSX.Element => {
  const { cart, setCart } = cartStore((state) => state);

  useLayoutEffect(() => {
    fetchCart()
      .then((data) => {
        typeof data !== 'string' ? setCart(data) : notification('error', data);
      })
      .catch((e: Error) => notification('error', e.message));
  }, [JSON.stringify(cart)]);

  const increaseProductCartQuantity = async (productId: string): Promise<void> => {
    try {
      if (cart) {
        const data = await addProduct(cart.version, cart.id, productId, 1);

        // data !== 'string' ? setCart(data) : notification('error', data);
      }
    } catch (error) {
      if (error instanceof Error) notification('error', error.message);
    }
  };

  const decreaseProductCartQuantity = async (lineItemId: string, quantity: number): Promise<void> => {
    try {
      if (cart) {
        const data = await removeProduct(cart.version, cart.id, lineItemId, quantity);

        // data !== 'string' ? setCart(data) : notification('error', data);
      }
    } catch (error) {
      if (error instanceof Error) notification('error', error.message);
    }
  };

  return (
    <section>
      <Grid component='ul' container>
        {cart && cart?.lineItems.length > 0 ? (
          <>
            {cart.lineItems.map((el) => (
              <CartItem
                key={el.id}
                product={el}
                increaseQuantity={increaseProductCartQuantity}
                decreaseQuantity={decreaseProductCartQuantity}
              />
            ))}

            <p>Total price: {getCartTotalPrice(cart.lineItems)} $ </p>
          </>
        ) : (
          <h4>Empty</h4>
        )}
      </Grid>
    </section>
  );
};

export default Cart;
