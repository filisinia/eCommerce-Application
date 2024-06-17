import { useLayoutEffect } from 'react';

import { Grid } from '@mui/material';

import CartItem from './CartItem';

import { fetchCart } from 'api/cart/cart';
import cartStore from 'store/slices/cart/cartSlice';
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

  return (
    <section>
      <Grid component='ul' container>
        {cart && cart?.lineItems.length > 0 ? (
          cart.lineItems.map((el) => <CartItem key={el.id} product={el} />)
        ) : (
          <h4>Empty</h4>
        )}
      </Grid>
    </section>
  );
};

export default Cart;
