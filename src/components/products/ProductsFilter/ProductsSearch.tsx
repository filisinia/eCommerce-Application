import { ChangeEvent, FC } from 'react';

import { TextField } from '@mui/material';

interface IProductsSearch {
  searchProducts: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProductsSearch: FC<IProductsSearch> = ({ searchProducts }): JSX.Element => (
  <TextField onChange={searchProducts} size='small' sx={{ width: '300px', margin: '8px' }} label='Search' />
);

export default ProductsSearch;
