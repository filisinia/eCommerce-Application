import { IProductCart } from 'types/cart';

const getCartTotalPrice = (products: IProductCart[], isDiscountActive: boolean): number => {
  const totalProductPrice = products.reduce((acc, product: IProductCart): number => {
    let total = acc;
    const { quantity, totalPrice, price } = product;

    const [discountPrice, defaultPrice] = [totalPrice.centAmount, price.value.centAmount];

    isDiscountActive ? (total += quantity * discountPrice) : (total += quantity * defaultPrice);

    return total;
  }, 0);

  return totalProductPrice;
};

export default getCartTotalPrice;
