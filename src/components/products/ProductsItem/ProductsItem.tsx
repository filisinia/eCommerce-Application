import styled from '@emotion/styled';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Grid, CardHeader, CardMedia, CardContent, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import 'components/products/ProductsItem/ProductItemStyle.scss';

import { addProduct } from 'api/cart/cart';
import cartStore from 'store/slices/cart/cartSlice';
import { IProduct } from 'types/products';
import notification from 'utils/notification';

interface IProductsItem {
  product: IProduct;
}

const Card = styled.div`
  height: 100%;
  transition: 1s all;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  &:hover {
    background-color: rgb(43, 40, 40);
    color: white;
    box-shadow:
      0px 5px 5px -3px rgba(43, 40, 40, 0.8),
      0px 8px 10px 1px rgba(43, 40, 40, 0.64),
      0px 3px 14px 2px rgba(43, 40, 40, 0.62);
    transform: scale(1.05);
  }
  &:hover .MuiTypography-root {
    color: rgb(255, 228, 196);
  }
  &:hover .MuiSvgIcon-root {
    fill: rgb(255, 228, 196);
  }

  &:hover .product__price {
    color: rgb(255, 251, 0);
  }
  &:hover .product__discount {
    color: rgb(199, 0, 57);
  }
  &:hover .product__text {
    color: white;
  }
`;

const ProduсtsItem = ({ product }: IProductsItem): JSX.Element => {
  const { cart, setCart } = cartStore((state) => state);
  const { masterVariant, name, description } = product;
  const { id } = masterVariant;
  const { value, discounted } = masterVariant.prices[0];
  const navigate = useNavigate();

  const descriptionSize = 150;
  const shortDescription = description['en-US'].slice(0, descriptionSize);

  const handleNavigation = (e: React.MouseEvent<HTMLDivElement>): void => {
    const targetElem = e.target;

    if (targetElem instanceof HTMLElement && !targetElem.closest('button')) navigate(`/products/${product.key}`);
  };

  const handleAddProduct = (): void => {
    if (cart) {
      addProduct(cart.version, cart.id, product.id, 1)
        .then((data) => {
          if (typeof data !== 'string') {
            setCart(data);
            notification('success', `${product.name['en-US']} was successfully added to the cart!`);
          } else {
            notification('error', data);
          }
        })
        .catch((e) => e instanceof Error && notification('error', e.message));
    }
  };

  return (
    <Grid component='li' item key={id} lg={3} md={4} sm={6} xs={12} className='product' sx={{ gridAutoColumns: '1fr' }}>
      <Card className='product__container' onClick={(e: React.MouseEvent<HTMLDivElement>): void => handleNavigation(e)}>
        <CardHeader
          title={name['en-US']}
          action={
            <IconButton onClick={handleAddProduct}>
              <AddShoppingCartIcon />
            </IconButton>
          }
        />
        <CardMedia
          component='img'
          height='250'
          image={masterVariant?.images[0]?.url}
          alt={name['en-US']}
          sx={{ height: 'auto' }}
        />

        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '0.2rem' }}>
          {discounted && <span className='product__price'> {discounted.value.centAmount.toLocaleString()} USD</span>}
          <span className={discounted ? 'product__price product__discount' : 'product__price'}>
            {value.centAmount.toLocaleString()} USD
          </span>

          <Typography>
            <span className='product__text'>{shortDescription}</span>
            <b>...</b>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProduсtsItem;
