import { IProductCart } from 'types/cart';

const CartItem = ({ product }: { product: IProductCart }): JSX.Element => {
  console.log(product);

  return (
    <div>
      <h3>{product?.name['en-US']}</h3>
      <p>{product.totalPrice.centAmount} USD</p>
      <img
        src={product?.variant.images[0].url}
        alt={product?.name['en-US']}
        style={{ width: '10rem', height: '10rem' }}
      />
      <p>quantity : {product.quantity}</p>
    </div>
  );
};

export default CartItem;
