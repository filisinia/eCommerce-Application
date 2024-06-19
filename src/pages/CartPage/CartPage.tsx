import { useLayoutEffect, useState } from 'react';

import { fetchDiscountCodes } from 'api/cart/discount';
import Cart from 'components/Cart/Cart';
import { ICartDiscount } from 'types/cart';
import { getCookie } from 'utils/getCoockie';
import notification from 'utils/notification';

const CartPage = (): JSX.Element => {
  const [isDiscoundActive, setDiscoundActive] = useState(false);

  useLayoutEffect(() => {
    const discount = getCookie('discount');

    fetchDiscountCodes()
      .then((data) => {
        if (typeof data !== 'string') {
          const validCode = data.find((promo: ICartDiscount): boolean => promo.code === discount);

          if (validCode) setDiscoundActive(true);
        } else notification('error', data);
      })
      .catch((err: Error) => notification('error', err.message));
  });

  return <Cart isDiscoundActive={isDiscoundActive} />;
};

export default CartPage;
