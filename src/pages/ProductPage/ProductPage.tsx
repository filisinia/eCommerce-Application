import { useLayoutEffect, useState } from 'react';

import { Box, Container } from '@mui/material';

import fetchProductInfo from 'api/products/productInfoApi';
import ProductDescription from 'components/productInfo/ProductDescription';
import ProductImages from 'components/productInfo/ProductImages';
import ProductPageStyle from 'pages/ProductPage/ProductPageStyle';
import { IProduct } from 'types/products';
import notification from 'utils/notification';

const ProductPage = (): JSX.Element => {
  const productKey = 'traditional-l-seater-sofa';
  const [productInfo, setProductInfo] = useState<IProduct | null>(null);

  const getProductInfo = async (): Promise<void> => {
    const fetchedProductInfo = await fetchProductInfo(productKey);

    if (typeof fetchedProductInfo !== 'string') setProductInfo(fetchedProductInfo);
  };

  useLayoutEffect(() => {
    getProductInfo().catch((e: Error) => notification('error', e.message));
  }, []);

  return (
    <Container sx={ProductPageStyle.container}>
      {productInfo ? (
        <>
          <Box sx={ProductPageStyle.imagesBox}>
            <ProductImages productInfo={productInfo} />
          </Box>
          <Box sx={ProductPageStyle.descriptionBox}>
            <ProductDescription productInfo={productInfo} />
          </Box>
        </>
      ) : (
        ''
      )}
    </Container>
  );
};

export default ProductPage;
