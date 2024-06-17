import { useContext, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import styles from 'components/productInfo/productDescription/productDescriptionStyle';
import productInfoContext from 'components/productInfo/ProductInfoContext';

const ProductDescription = (): JSX.Element | null => {
  const [isInCart, setIsInCart] = useState(false);
  const productInfo = useContext(productInfoContext);

  if (!productInfo) return null;

  const priceData = productInfo.masterVariant.prices[0];
  const price = priceData.value;
  const priceDiscounted = priceData.discounted?.value;

  return (
    <Box sx={styles.descriptionBox}>
      <Typography component='h2' variant='h4' sx={styles.name}>
        {productInfo.name['en-US']}
      </Typography>
      <Box sx={styles.priceBox}>
        <Typography sx={priceDiscounted ? styles.currentPrice : { display: 'none' }}>
          {priceDiscounted?.centAmount.toLocaleString()} {priceDiscounted?.currencyCode}
        </Typography>
        <Typography sx={priceDiscounted ? styles.oldPrice : styles.currentPrice}>
          {price.centAmount.toLocaleString()} {price.currencyCode}
        </Typography>
      </Box>
      <Typography>{productInfo.description['en-US']}</Typography>
      <Button variant='contained' sx={styles.button}>
        {isInCart ? 'Remove from cart' : 'Add to cart'}
      </Button>
    </Box>
  );
};

export default ProductDescription;
