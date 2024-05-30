import { useLayoutEffect, useState } from 'react';

import { fetchProducts } from 'api/products/productsApi';
import Loader from 'components/Loader/Loader';
import ProductsList from 'components/products/ProductsList';
import { IProduct } from 'types/products';
import notification from 'utils/notification';

const Products = (): JSX.Element => {
  const [products, setProducts] = useState<null | IProduct[]>(null);

  const getProducts = async (limit: number): Promise<void> => {
    const data = await fetchProducts(limit);

    console.log(data);

    typeof data !== 'string' ? setProducts(data.results) : notification('error', data);
  };

  useLayoutEffect(() => {
    const productsLimit = 20;

    getProducts(productsLimit).catch((e: Error) => notification('error', e.message));
  }, []);

  return !products ? (
    <Loader />
  ) : (
    <main>
      <section>
        <ProductsList products={products} />;
      </section>
    </main>
  );
};

export default Products;
