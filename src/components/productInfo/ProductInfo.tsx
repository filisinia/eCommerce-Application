import { FC } from 'react';

import { Box, Container } from '@mui/material';

import ProductDescription from './productDescription/ProductDescription';
import ProductImages from './productImages/ProductImages';

import styles from 'components/productInfo/ProductInfoStyle';
import { IProduct } from 'types/products';

interface IProductInfo {
  productInfo: IProduct;
}

const ProductInfo: FC<IProductInfo> = ({ productInfo }): JSX.Element => (
  <Container sx={styles.container}>
    <Box sx={styles.imagesBox}>
      <ProductImages productInfo={productInfo} />
    </Box>
    <Box sx={styles.descriptionBox}>
      <ProductDescription productInfo={productInfo} />
    </Box>
  </Container>
);

export default ProductInfo;
