import { Box, Container } from '@mui/material';

import ProductDescription from './productDescription/ProductDescription';
import ProductImages from './productImages/ProductImages';

import styles from 'components/productInfo/ProductInfoStyle';

const ProductInfo = (): JSX.Element => (
  <Container sx={styles.container}>
    <Box sx={styles.imagesBox}>
      <ProductImages />
    </Box>
    <Box sx={styles.descriptionBox}>
      <ProductDescription />
    </Box>
  </Container>
);

export default ProductInfo;
