import { useLayoutEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { fetchProductInfo } from 'api/products/productsApi';
import Loader from 'components/Loader/Loader';
import ProductInfo from 'components/productInfo/ProductInfo';
import productInfoContext from 'components/productInfo/ProductInfoContext';
import { IProduct } from 'types/products';
import notification from 'utils/notification';

const ProductPage = (): JSX.Element => {
  const { productKey } = useParams();
  const [productInfo, setProductInfo] = useState<null | IProduct>(null);

  const getProductInfo = async (): Promise<void> => {
    if (!productKey) return;
    const fetchedProductInfo = await fetchProductInfo(productKey);

    if (typeof fetchedProductInfo !== 'string') setProductInfo(fetchedProductInfo);
  };

  useLayoutEffect(() => {
    getProductInfo().catch((e: Error) => notification('error', e.message));
  }, [productKey]);

  return productInfo ? (
    <productInfoContext.Provider value={productInfo}>
      <ProductInfo />
    </productInfoContext.Provider>
  ) : (
    <Loader />
  );
};

export default ProductPage;
