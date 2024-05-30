import { Box, Typography } from '@mui/material';

import styles from 'components/productInfo/productDescription/productDescriptionStyle';
import { IProduct } from 'types/products';

const ProductDescription = ({ productInfo }: { productInfo: IProduct }): JSX.Element => {
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
