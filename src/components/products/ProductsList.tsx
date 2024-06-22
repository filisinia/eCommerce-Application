import { FC } from 'react';

import { Grid } from '@mui/material';

import ProduсtsItem from 'components/products/ProductsItem/ProductsItem';
import { IProduct } from 'types/products';

interface IProductsList {
  products: IProduct[];
}

const ProductsList: FC<IProductsList> = ({ products }): JSX.Element => (
  <Grid component='ul' container sx={{ paddingInlineStart: '0' }} spacing={2} justifyContent='space-around'>
    {products.map((product) => (
      <ProduсtsItem product={product} key={product?.id || ''} />
    ))}
  </Grid>
);

export default ProductsList;
