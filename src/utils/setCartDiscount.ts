import { ICart, ICartDiscount, IProductCart } from 'types/cart';

const setCartDiscount = (cart: ICart, discount: ICartDiscount): ICart => {
  const newCart = { ...cart };
  const productDiscount = Number(discount.cartPredicate.split('=')[0]);
  const percent = 100;

  newCart.lineItems.forEach((product: IProductCart): void => {
    const newProduct = { ...product };

    newProduct.totalPrice.centAmount -= (newProduct.totalPrice.centAmount * productDiscount) / percent;
  });

  return newCart;
};

export default setCartDiscount;
