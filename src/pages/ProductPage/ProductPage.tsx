import { useLayoutEffect } from 'react';

import { useParams } from 'react-router-dom';

import fetchProductInfo from 'api/products/productInfoApi';
import ProductInfo from 'components/productInfo/ProductInfo';
import productInfoStore from 'store/slices/productInfo/productInfoSlice';
import notification from 'utils/notification';

const ProductPage = (): JSX.Element => {
  const { productKey } = useParams();
  const { productInfo, setProductInfo } = productInfoStore((state) => state);

  const getProductInfo = async (): Promise<void> => {
    if (!productKey) {
      notification('error', 'The product key was not provided');

      return;
    }
    const fetchedProductInfo = await fetchProductInfo(productKey);

    if (typeof fetchedProductInfo !== 'string') setProductInfo(fetchedProductInfo);
  };

  useLayoutEffect(() => {
    getProductInfo().catch((e: Error) => notification('error', e.message));
  }, [productKey]);

  return productInfo ? <ProductInfo /> : <span>Loading...</span>;
};

export default ProductPage;
