import { useLayoutEffect, useState } from 'react';

import { Button } from '@mui/material';

import { fetchProducts, sortProductsByPrice } from 'api/products/productsApi';
import Loader from 'components/Loader/Loader';
import ProductsList from 'components/products/ProductsList';
import { IProduct, IProducts } from 'types/products';
import notification from 'utils/notification';

const Products = (): JSX.Element => {
  const [products, setProducts] = useState<null | IProduct[]>(null);

  const setPoductsByPrice = (): void => {
    sortProductsByPrice('asc')
      .then((data: IProducts | string) => {
        typeof data !== 'string' ? setProducts(data.results) : notification('error', data);
      })
      .catch((err: Error) => {
        notification('error', err.message);
      });
  };

  const getProducts = async (limit: number): Promise<void> => {
    const data = await fetchProducts(limit);

    typeof data !== 'string' ? setProducts(data.results) : notification('error', data);
  };

  useLayoutEffect(() => {
    const limit = 12;

    getProducts(limit).catch((e: Error) => notification('error', e.message));
  }, []);

  return !products ? (
    <Loader />
  ) : (
    <main>
      <Button type='button' onClick={setPoductsByPrice}>
        Sort by Price
      </Button>
      <section className='section'>
        <ProductsList products={products} />
      </section>
    </main>
  );
};

export default Products;
