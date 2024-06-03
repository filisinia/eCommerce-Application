import { Box, Container } from '@mui/material';

import ProductDescription from 'components/productInfo/productDescription/ProductDescription';
import ProductImages from 'components/productInfo/productImages/ProductImages';
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
