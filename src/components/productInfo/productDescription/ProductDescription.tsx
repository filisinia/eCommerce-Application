import { Box, Typography } from '@mui/material';

import styles from 'components/productInfo/productDescription/productDescriptionStyle';
import productInfoStore from 'store/slices/productInfo/productInfoSlice';

const ProductDescription = (): JSX.Element | null => {
  const { productInfo } = productInfoStore((state) => state);

  if (!productInfo) return null;

  const priceData = productInfo.masterVariant.prices[0];

  return (
    <Box sx={styles.descriptionBox}>
      <Typography component='h2' variant='h4' sx={styles.name}>
        {productInfo.name['en-US']}
      </Typography>
      <Box sx={styles.priceBox}>
        <Typography sx={styles.currentPrice}>
          {priceData?.value?.centAmount.toLocaleString()} {priceData.value.currencyCode}
        </Typography>
        <Typography sx={styles.oldPrice}>{priceData.discounted?.value?.centAmount.toLocaleString()}</Typography>
      </Box>
      <Typography>{productInfo.description['en-US']}</Typography>
    </Box>
  );
};

export default ProductDescription;
