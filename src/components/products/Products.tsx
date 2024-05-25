import { useLayoutEffect, useState } from 'react';

import { Box } from '@mui/material';

import fetchProducts from 'api/products/productsApi';
import { IProduct } from 'types/products';
import notification from 'utils/notification';

const Products = (): JSX.Element => {
  const [products, setProducts] = useState<null | IProduct[]>(null);

  useLayoutEffect(() => {
    const limit = 20;

    fetchProducts(limit)
      .then((res) => console.log(res))

      .catch((e: Error) => notification('error', e.message));
  }, []);

  return <Box>Products</Box>;
};

export default Products;
