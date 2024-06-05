import { useLayoutEffect, useState } from 'react';

import { Box, Button } from '@mui/material';

import { fetchProductsCategories } from 'api/products/productsApi';
import { IProductCategory } from 'types/products';
import notification from 'utils/notification';

const ProductsCategories = (): JSX.Element => {
  const [categories, setCategories] = useState<IProductCategory[]>([]);

  const getCategories = async (): Promise<void> => {
    const data = await fetchProductsCategories();

    console.log(data);

    typeof data !== 'string' ? setCategories(data.results) : notification('error', data);
  };

  useLayoutEffect(() => {
    getCategories().catch((e: Error) => notification('error', e.message));
  }, []);

  const categoriesElems = categories.map((category) => <Button key={category.id}>{category.name['en-US']}</Button>);

  return <Box>{categoriesElems}</Box>;
};

export default ProductsCategories;
