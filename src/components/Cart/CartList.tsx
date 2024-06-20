import { useEffect, useState } from 'react';

import CartItem from './CartItem';

import { fetchDiscountCodes } from 'api/cart/discount';
import { ICartDiscount, IProductCart } from 'types/cart';
import { eraseCookie, getCookie } from 'utils/getCoockie';
import notification from 'utils/notification';

interface ICartList {
  products: IProductCart[];
  increaseQuantity: (productId: string) => Promise<void>;
  decreaseQuantity: (lineItemId: string, quantity: number) => Promise<void>;
}

export const CartList = ({ products, increaseQuantity, decreaseQuantity }: ICartList): JSX.Element => {
  const [isDiscoundActives, setDiscoundActive] = useState(false);

  useEffect(() => {
    const discount = getCookie('discount');

    fetchDiscountCodes()
      .then((data) => {
        if (typeof data !== 'string') {
          const validCode = data.find((promo: ICartDiscount): boolean => promo.code === discount);

          if (validCode) setDiscoundActive(true);
        } else {
          notification('error', data);
          eraseCookie('discount');
          setDiscoundActive(false);
        }
      })
      .catch((err: Error) => notification('error', err.message));
  });

  return (
    <>
      {products.map((el) => (
        <CartItem
          key={el.id}
          product={el}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          isDiscoundActive={isDiscoundActives}
        />
      ))}
    </>
  );
};
