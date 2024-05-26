import { useLayoutEffect, useState } from 'react';

import { Box } from '@mui/material';

import fetchProducts from 'api/products/productsApi';
import ProductsList from 'components/products/ProductsList';
import { IProduct } from 'types/products';
import notification from 'utils/notification';

const Products = (): JSX.Element => {
  const [products, setProducts] = useState<null | IProduct[]>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const getProducts = async (limit: number): Promise<void> => {
    const data = await fetchProducts(limit);

    if (typeof data !== 'string') {
      setProducts(data.results);
      setTotalPage(data.total);
    } else {
      notification('error', data);
    }
  };

  useLayoutEffect(() => {
    const productsLimit = 20;

    getProducts(productsLimit).catch((e: Error) => notification('error', e.message));
  }, []);

  return products ? <ProductsList products={products} /> : <Box>Oops</Box>;
};

export default Products;
