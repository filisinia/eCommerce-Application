import { Box, Typography } from '@mui/material';

import ProductInfoStyle from 'components/productInfo/ProductInfoStyle';
import { IProduct } from 'types/products';

const ProductDescription = ({ productInfo }: { productInfo: IProduct }): JSX.Element => {
  const { name, description } = productInfo?.masterData?.current || {};
  const priceData = productInfo?.masterData?.current?.masterVariant?.prices?.[0];

  return (
    <Box sx={ProductInfoStyle.productDescription.descriptionBox}>
      <Typography component='h2' variant='h4' sx={ProductInfoStyle.productDescription.name}>
        {name['en-US']}
      </Typography>
      <Box sx={ProductInfoStyle.productDescription.priceBox}>
        <Typography sx={ProductInfoStyle.productDescription.currentPrice}>
          {priceData?.value?.centAmount.toLocaleString()} {priceData?.value?.currencyCode}
        </Typography>
        <Typography sx={ProductInfoStyle.productDescription.oldPrice}>
          {priceData?.discounted?.value?.centAmount.toLocaleString()}
        </Typography>
      </Box>
      <Typography>{description['en-US']}</Typography>
    </Box>
  );
};

export default ProductDescription;
