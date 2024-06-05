import { useLayoutEffect, useState } from 'react';

import { fetchProducts, sortProductsByType } from 'api/products/productsApi';
import Loader from 'components/Loader/Loader';
import ProductsCategories from 'components/products/Categories/ProductsCategories';
import ProductsList from 'components/products/ProductsList';
import ProductsSortSelector from 'components/products/ProductsSortSelector/ProductsSortSelector';
import { IProduct, IProducts } from 'types/products';
import notification from 'utils/notification';

const Products = (): JSX.Element => {
  const newArrivalsId = 'e4cacec0-aa5f-4c3f-993a-9165dbeeded1';
  const [defaultLimit, setDefaultLimit] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>(newArrivalsId);
  const [products, setProducts] = useState<null | IProduct[]>(null);

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

  useLayoutEffect(() => {
    const limit = 12;

    getProducts(limit).catch((e: Error) => notification('error', e.message));
  }, [categoryId]);

  return !products ? (
    <Loader />
  ) : (
    <main>
      <ProductsCategories setCategoryId={setCategoryId} />
      <ProductsSortSelector key={categoryId} sortProducts={sortProducts} />
      <section className='section'>
        <ProductsList products={products} />
      </section>
    </main>
  );
};

export default Products;
