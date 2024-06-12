import { useLayoutEffect } from 'react';

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
  }, [cart]);

  return <div>Cart</div>;
};

export default Cart;
