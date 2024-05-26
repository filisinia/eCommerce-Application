import { useLayoutEffect, useState } from 'react';

import { Container, Typography } from '@mui/material';

import fetchProductInfo from 'api/products/productInfoApi';
import { IProduct } from 'types/products';
import notification from 'utils/notification';

const ProductPage = (): JSX.Element => {
  const productKey = 'modern-upholstered-twin-bed';
  const [productInfo, setProductInfo] = useState<IProduct | null>(null);

  const getProductInfo = async (): Promise<void> => {
    const fetchedProductInfo = await fetchProductInfo(productKey);

    if (typeof fetchedProductInfo !== 'string') setProductInfo(fetchedProductInfo);
  };

  useLayoutEffect(() => {
    getProductInfo().catch((e: Error) => notification('error', e.message));
  }, []);

  const images = productInfo?.masterData.current.masterVariant.images.map((imageData) => (
    <img
      style={{ height: '400px' }}
      src={imageData.url}
      alt={productInfo.masterData.current.name['en-US']}
      key={imageData.url}
    />
  ));

  return (
    <Container>
      <Typography>Product page</Typography>
      <Container>{images}</Container>
      <Typography>{productInfo?.masterData.current.name['en-US']}</Typography>
      <Typography>{productInfo?.masterData.current.description['en-US']}</Typography>
    </Container>
  );
};

export default ProductPage;
