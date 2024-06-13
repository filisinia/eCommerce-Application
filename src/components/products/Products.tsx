import { ChangeEvent, useLayoutEffect, useState } from 'react';

import { Box } from '@mui/material';

import {
  fetchFilterByPrice,
  fetchMinMaxCategoryPrice,
  fetchProducts,
  searchProductsByInput,
  sortProductsByType,
} from 'api/products/productsApi';
import Loader from 'components/Loader/Loader';
import BreadcrumbsElem from 'components/products/Breadcrumbs/Breadcrumbs';
import ProductsCategories from 'components/products/Categories/ProductsCategories';
import ProductFilter from 'components/products/ProductsFilter/ProductFilter';
import ProductsSearch from 'components/products/ProductsFilter/ProductsSearch';
import ProductsList from 'components/products/ProductsList';
import ProductsSortSelector from 'components/products/ProductsSortSelector/ProductsSortSelector';
import Spinner from 'components/spinner/Spinner';
import { IBreadcrumb, IProduct, IProducts } from 'types/products';
import notification from 'utils/notification';

const Products = (): JSX.Element => {
  const newArrivalsId = 'e4cacec0-aa5f-4c3f-993a-9165dbeeded1';
  const [defaultLimit, setDefaultLimit] = useState<number>(0);
  const [minCategoryPrice, setMinCategoryPrice] = useState<number>(0);
  const [maxCategoryPrice, setMaxCategoryPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>(newArrivalsId);
  const [products, setProducts] = useState<null | IProduct[]>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[]>([{ id: newArrivalsId, name: 'New-arrivals' }]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortProducts = (type: string, direction: string): void => {
    sortProductsByType(categoryId, type, direction, defaultLimit)
      .then((data: IProducts | string) => {
        typeof data !== 'string' ? setProducts(data.results) : notification('error', data);
      })
      .catch((err: Error) => {
        notification('error', err.message);
      });
  };

  const getMinMaxPrice = async (): Promise<void> => {
    const facet = await fetchMinMaxCategoryPrice(categoryId);

    if (typeof facet !== 'string') {
      setMinCategoryPrice(facet.min);
      setMaxCategoryPrice(facet.max);
    } else {
      notification('error', facet);
    }
  };

  const getProducts = async (): Promise<void> => {
    const data = await fetchProducts(categoryId, currentPage);

    await getMinMaxPrice();

    if (typeof data !== 'string') {
      setProducts(data.results);
      setDefaultLimit(data.limit);
    } else {
      notification('error', data);
    }
  };

  const searchProducts = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setCurrentPage(1);

    if (value.length === 0) getProducts().catch((error: Error) => notification('error', error.message));

    searchProductsByInput(value)
      .then((data: IProducts | string) => {
        typeof data !== 'string' ? setProducts(data.results) : notification('error', data);
      })
      .catch((err: Error) => {
        notification('error', err.message);
      });
  };

  const filterByPrice = (min: number, max: number): void => {
    fetchFilterByPrice(categoryId, min, max)
      .then((data: IProducts | string) => {
        typeof data !== 'string' ? setProducts(data.results) : notification('error', data);
      })
      .catch((err: Error) => {
        notification('error', err.message);
      });
  };

  useLayoutEffect(() => {
    setCurrentPage(1);

    getProducts().catch((e: Error) => notification('error', e.message));
  }, [categoryId]);

  return !products ? (
    <Loader />
  ) : (
    <main>
      <ProductsCategories setCategoryId={setCategoryId} setBreadcrumbs={setBreadcrumbs} />
      <Box
        key={categoryId}
        display='flex'
        alignItems='center'
        flexWrap='wrap'
        sx={{ '@media (max-width: 600px)': { flexDirection: 'column' } }}
      >
        <ProductsSortSelector sortProducts={sortProducts} />
        <ProductsSearch searchProducts={searchProducts} />
        <ProductFilter
          filterByPrice={filterByPrice}
          minCategoryPrice={minCategoryPrice}
          maxCategoryPrice={maxCategoryPrice}
        />
      </Box>
      <BreadcrumbsElem setCategoryId={setCategoryId} setBreadcrumbs={setBreadcrumbs} breadcrumbs={breadcrumbs} />
      <section className='section'>
        <ProductsList products={products} />
        <Spinner />
      </section>
    </main>
  );
};

export default Products;
