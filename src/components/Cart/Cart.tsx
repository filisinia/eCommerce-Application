import { useLayoutEffect } from 'react';

import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import CartDiscount from './CartDiscount';
import CartItem from './CartItem';

import { fetchCart, addProduct, removeProduct, removeCart } from 'api/cart/cart';
import cartStore from 'store/slices/cart/cartSlice';
import getCartTotalPrice from 'utils/getCarTotalPrice';
import notification from 'utils/notification';

const Cart = (): JSX.Element => {
  const { cart, setCart } = cartStore((state) => state);

  useLayoutEffect(() => {
    fetchCart()
      .then((data) => {
        if (typeof data !== 'string') setCart(data);
        else {
          setCart(null);
          notification('error', data);
        }
      })
      .catch((e: Error) => notification('error', e.message));
  }, [JSON.stringify(cart)]);

  const increaseProductCartQuantity = async (productId: string): Promise<void> => {
    try {
      if (cart) {
        const data = await addProduct(cart.version, cart.id, productId, 1);

        typeof data !== 'string' ? setCart(data) : notification('error', data);
      }
    } catch (error) {
      if (error instanceof Error) notification('error', error.message);
    }
  };

  const decreaseProductCartQuantity = async (lineItemId: string, quantity: number): Promise<void> => {
    try {
      if (cart) {
        const data = await removeProduct(cart.version, cart.id, lineItemId, quantity);

        typeof data !== 'string' ? setCart(data) : notification('error', data);
      }
    } catch (error) {
      if (error instanceof Error) notification('error', error.message);
    }
  };

  const removeAllTheProduct = (): void => {
    if (cart)
      removeCart(cart.id)
        .then((data) => (typeof data !== 'string' ? setCart(data) : notification('error', data)))
        .catch((e: Error) => notification('error', e.message));
  };

  return (
    <section>
      <Grid component='ul' container direction='column' rowGap={8} alignItems='center'>
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
            <CartDiscount />

            <p>Total price: {getCartTotalPrice(cart.lineItems)} $ </p>

            <Button onClick={removeAllTheProduct}> Remove all the products</Button>
          </>
        ) : (
          <>
            <h4>Empty</h4>
            <Link to='/products'>Products</Link>
          </>
        )}
      </Grid>
    </section>
  );
};

export default Cart;
