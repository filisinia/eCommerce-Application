import { useEffect } from 'react';

import { Button, Grid } from '@mui/material';

import { CartList } from './CartList';
import EmpthyCart from './EmpthyCart';

import { fetchCart, addProduct, removeProduct, removeCart, checkIsCartExist, createCart } from 'api/cart/cart';
import CartDiscount from 'components/Cart/CartDiscount';
import cartStore from 'store/slices/cart/cartSlice';
import customerStore from 'store/slices/customer/customerSlice';
import notification from 'utils/notification';

const Cart = (): JSX.Element => {
  const { cart, setCart } = cartStore((state) => state);

  const customerId = customerStore((state) => state.customer?.id);

  const createNewCart = async (): Promise<void> => {
    const newCart = customerId ? await createCart(customerId) : await createCart();

    typeof newCart !== 'string' ? setCart(newCart) : notification('error', newCart);
  };

  const fetchOldCart = async (): Promise<void> => {
    const oldCart = await fetchCart(customerId);

    typeof oldCart !== 'string' ? setCart(oldCart) : notification('error', oldCart);
  };

  useEffect((): void => {
    const initializeCart = async (): Promise<void> => {
      if (customerId) {
        const isExist = await checkIsCartExist(customerId);

        isExist ? await fetchOldCart() : await createNewCart();
      } else {
        await createNewCart();
      }
    };

    initializeCart().catch((e) => e instanceof Error && notification('error', e.message));
  }, [customerId]);

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
      removeCart(cart.version, cart.id)
        .then((data) => {
          typeof data !== 'string'
            ? createNewCart().catch(() => notification('error', 'Error occurred while creating a new cart'))
            : notification('error', data);
        })
        .catch((e: Error) => notification('error', e.message));
  };

  return (
    <section style={{ marginBottom: '2rem' }}>
      <Grid component='ul' container direction='column' alignItems='center'>
        {cart && cart.lineItems.length > 0 ? (
          <>
            <CartList
              products={cart.lineItems}
              increaseQuantity={increaseProductCartQuantity}
              decreaseQuantity={decreaseProductCartQuantity}
            />

            <CartDiscount />

            <Button onClick={removeAllTheProduct}>Clear Shopping Cart</Button>
          </>
        ) : (
          <EmpthyCart />
        )}
      </Grid>
    </section>
  );
};

export default Cart;
