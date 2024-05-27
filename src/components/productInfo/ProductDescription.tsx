import { Box, Typography } from '@mui/material';

import ProductInfoStyle from 'components/productInfo/ProductInfoStyle';
import { IProduct } from 'types/products';

const ProductDescription = ({ productInfo }: { productInfo: IProduct }): JSX.Element => {
  const priceData = productInfo?.masterData?.current?.masterVariant?.prices?.[0];

  return (
    <>
      <Typography component='h2' variant='h4' sx={ProductInfoStyle.productDescription.name}>
        {productInfo?.masterData?.current?.name?.['en-US']}
      </Typography>
      <Box sx={ProductInfoStyle.productDescription.priceBox}>
        <Typography>
          {priceData?.value?.centAmount} {priceData?.value?.currencyCode}
        </Typography>
        <Typography>{priceData?.discounted?.value?.centAmount}</Typography>
      </Box>
      <Typography>{productInfo?.masterData?.current?.description?.['en-US']}</Typography>
    </>
  );
};

export default ProductDescription;
