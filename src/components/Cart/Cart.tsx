import { useLayoutEffect } from 'react';

import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { fetchCart, addProduct, removeProduct, removeCart, checkIsCartExist, createCart } from 'api/cart/cart';
import CartDiscount from 'components/Cart/CartDiscount';
import CartItem from 'components/Cart/CartItem';
import cartStore from 'store/slices/cart/cartSlice';
import customerStore from 'store/slices/customer/customerSlice';
import formatNumber from 'utils/formatNumber';
import getCartTotalPrice from 'utils/getCartTotalPrice';
import notification from 'utils/notification';

const Cart = (): JSX.Element => {
  const { cart, setCart } = cartStore((state) => state);
  const { customer } = customerStore((state) => state);

  const createNewCart = async (customerId?: string): Promise<void> => {
    console.log('CREATING NEW CART');

    const newCart = customerId ? await createCart(customerId) : await createCart();

    console.log('NEW CART:', newCart);

    typeof newCart !== 'string' ? setCart(newCart) : notification('error', newCart);
  };

  const fetchOldCart = async (customerId: string): Promise<void> => {
    console.log('FETCHING OLD CART');

    const oldCart = await fetchCart(customerId);

    console.log('OLD CART:', oldCart);

    typeof oldCart !== 'string' ? setCart(oldCart) : notification('error', oldCart);
  };

  useLayoutEffect((): void => {
    const initializeCart = async (): Promise<void> => {
      if (customer?.id) {
        const isExist = await checkIsCartExist(customer.id);

        console.log('IS CART EXIST?', isExist);

        isExist ? await fetchOldCart(customer.id) : await createNewCart(customer.id);
      } else {
        await createNewCart();
      }
    };

    initializeCart().catch((e) => e instanceof Error && notification('error', e.message));
  }, [customer?.id]);

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
    console.log('REMOVE CART:', cart);
    if (cart)
      removeCart(cart.version, cart.id)
        .then((data) => {
          if (!customer?.id) return;

          typeof data !== 'string'
            ? createNewCart(customer.id).catch(() => notification('error', 'Error occurred while creating a new cart'))
            : notification('error', data);
        })
        .catch((e: Error) => notification('error', e.message));
  };

  return (
    <section style={{ marginBottom: '2rem' }}>
      <Grid component='ul' container direction='column' rowGap={8} alignItems='center'>
        {cart && cart.lineItems.length > 0 ? (
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

            <p>Total price: {formatNumber.format(getCartTotalPrice(cart.lineItems))} $ </p>

            <Button onClick={removeAllTheProduct}>Clear Shopping Cart</Button>
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
