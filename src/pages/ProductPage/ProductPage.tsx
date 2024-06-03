import { useLayoutEffect } from 'react';

import { useParams } from 'react-router-dom';

import { fetchProductInfo } from 'api/products/productsApi';
import Loader from 'components/Loader/Loader';
import ProductInfo from 'components/productInfo/ProductInfo';
import productInfoStore from 'store/slices/productInfo/productInfoSlice';
import notification from 'utils/notification';

const ProductPage = (): JSX.Element => {
  const { productKey } = useParams();
  const { productInfo, setProductInfo } = productInfoStore((state) => state);

  const getProductInfo = async (): Promise<void> => {
    if (!productKey) return;
    const fetchedProductInfo = await fetchProductInfo(productKey);

    if (typeof fetchedProductInfo !== 'string') setProductInfo(fetchedProductInfo);
  };

  useLayoutEffect(() => {
    getProductInfo().catch((e: Error) => notification('error', e.message));
  }, [productKey]);

  return productInfo ? <ProductInfo /> : <Loader />;
};

export default ProductPage;
