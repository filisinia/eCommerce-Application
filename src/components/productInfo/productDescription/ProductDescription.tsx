import { Box, Typography } from '@mui/material';

import styles from 'components/productInfo/productDescription/productDescriptionStyle';
import productInfoStore from 'store/slices/productInfo/productInfoSlice';
import notification from 'utils/notification';

const ProductDescription = (): JSX.Element => {
  const { productInfo } = productInfoStore((state) => state);

  if (!productInfo) {
    notification('error', 'The product info was not provided');

    return <span>Error</span>;
  }

  const { name, description } = productInfo?.masterData?.current || {};
  const priceData = productInfo?.masterData?.current?.masterVariant?.prices?.[0];

  return (
    <Box sx={styles.descriptionBox}>
      <Typography component='h2' variant='h4' sx={styles.name}>
        {name['en-US']}
      </Typography>
      <Box sx={styles.priceBox}>
        <Typography sx={styles.currentPrice}>
          {priceData?.value?.centAmount.toLocaleString()} {priceData?.value?.currencyCode}
        </Typography>
        <Typography sx={styles.oldPrice}>{priceData?.discounted?.value?.centAmount.toLocaleString()}</Typography>
      </Box>
      <Typography>{description['en-US']}</Typography>
    </Box>
  );
};

export default ProductDescription;
