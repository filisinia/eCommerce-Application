import { ChangeEvent, useLayoutEffect, useState } from 'react';

import { Box } from '@mui/material';

import { fetchProducts, searchProductsByInput, sortProductsByType } from 'api/products/productsApi';
import Loader from 'components/Loader/Loader';
import BreadcrumbsElem from 'components/products/Breadcrumbs/Breadcrumbs';
import ProductsCategories from 'components/products/Categories/ProductsCategories';
import ProductsList from 'components/products/ProductsList';
import ProductsSearch from 'components/products/ProductsSearch/ProductsSearch';
import ProductsSortSelector from 'components/products/ProductsSortSelector/ProductsSortSelector';
import { IBreadcrumb, IProduct, IProducts } from 'types/products';
import notification from 'utils/notification';

const Products = (): JSX.Element => {
  const newArrivalsId = 'e4cacec0-aa5f-4c3f-993a-9165dbeeded1';
  const [defaultLimit, setDefaultLimit] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>(newArrivalsId);
  const [products, setProducts] = useState<null | IProduct[]>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[]>([{ id: newArrivalsId, name: 'New-arrivals' }]);

  const sortProducts = (type: string, direction: string): void => {
    sortProductsByType(categoryId, type, direction, defaultLimit)
      .then((data: IProducts | string) => {
        typeof data !== 'string' ? setProducts(data.results) : notification('error', data);
      })
      .catch((err: Error) => {
        notification('error', err.message);
      });
  };

  const getProducts = async (limit: number): Promise<void> => {
    const data = await fetchProducts(categoryId, limit);

    if (typeof data !== 'string') {
      setProducts(data.results);
      setDefaultLimit(data.limit);
    } else {
      notification('error', data);
    }
  };

  const searchProducts = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const limit = 12;

    if (value.length === 0) getProducts(limit).catch((error: Error) => notification('error', error.message));

    searchProductsByInput(value)
      .then((data: IProducts | string) => {
        typeof data !== 'string' ? setProducts(data.results) : notification('error', data);
      })
      .catch((err: Error) => {
        notification('error', err.message);
      });
  };

  useLayoutEffect(() => {
    const limit = 12;

    getProducts(limit).catch((e: Error) => notification('error', e.message));
  }, [categoryId]);

  return !products ? (
    <Loader />
  ) : (
    <main>
      <ProductsCategories setCategoryId={setCategoryId} setBreadcrumbs={setBreadcrumbs} />
      <Box display='flex' alignItems='center' sx={{ '@media (max-width: 600px)': { flexDirection: 'column' } }}>
        <ProductsSortSelector key={categoryId} sortProducts={sortProducts} />
        <ProductsSearch searchProducts={searchProducts} />
      </Box>
      <BreadcrumbsElem setCategoryId={setCategoryId} setBreadcrumbs={setBreadcrumbs} breadcrumbs={breadcrumbs} />
      <section className='section'>
        <ProductsList products={products} />
      </section>
    </main>
  );
};

export default Products;
