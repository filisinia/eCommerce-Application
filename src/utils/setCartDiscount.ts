import { ICart, ICartDiscount, IProductCart } from 'types/cart';

const setCartDiscount = (cart: ICart, discount: ICartDiscount): ICart => {
  const newCart = { ...cart };
  const productDiscount = Number(discount.cartPredicate.split('=')[0]);
  const percent = 100;

  newCart.lineItems.forEach((product: IProductCart): void => {
    const newProduct = { ...product };

    const { totalPrice } = product;
    const { centAmount, country, fractionDigits, currencyCode } = totalPrice;

    const discountPrice = centAmount - (centAmount * productDiscount) / percent;

    const price = { type: 'discount-price', country, centAmount: discountPrice, fractionDigits, currencyCode };

    newProduct.discountedPricePerQuantity.push(price);
  });

  return newCart;
};

export default setCartDiscount;
