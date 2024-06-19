import { IProductCart } from 'types/cart';

const getCartTotalPrice = (products: IProductCart[]): number => {
  const totalProductPrice = products.reduce((acc, product: IProductCart): number => {
    let total = acc;
    const { quantity, totalPrice } = product;

    total += quantity * totalPrice.centAmount;

    return total;
  }, 0);

  return totalProductPrice;
};

export default getCartTotalPrice;
