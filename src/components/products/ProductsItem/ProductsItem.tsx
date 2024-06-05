import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, CardHeader, CardMedia, CardContent, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { IProduct } from 'types/products';

import 'components/products/ProductsItem/ProductItemStyle.scss';

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
`;

const ProduсtsItem = ({ product }: IProductsItem): JSX.Element => {
  const { masterVariant, name, description } = product;
  const { id } = masterVariant;
  const { value, discounted } = masterVariant.prices[0];

  const descriptionSize = 150;
  const shortDescription = description['en-US'].slice(0, descriptionSize);

  return (
    <Grid component='li' item key={id} lg={3} md={4} sm={6} xs={12} className='product' sx={{ gridAutoColumns: '1fr' }}>
      <Card className='product__container'>
        <CardHeader
          title={name['en-US']}
          action={
            <Link to={`/products/${product.key}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
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
            {shortDescription} <b>...</b>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProduсtsItem;
