import { IProductCart } from 'types/cart';

const getCartTotalPrice = (products: IProductCart[]): number => {
  const totalProductPrice = products.reduce((acc, product: IProductCart): number => {
    const { quantity } = product;
    const { totalPrice } = product;

    let total = acc;

    total += quantity * totalPrice.centAmount;

    return total;
  }, 0);

  return totalProductPrice;
};

export default getCartTotalPrice;
