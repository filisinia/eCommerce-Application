import { FC } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import style from './ProductsItemStyle';

import { IProduct } from 'types/products';

interface IProdcutsItem {
  product: IProduct;
}

const ProdcutsItem: FC<IProdcutsItem> = ({ product }): JSX.Element => {
  const { id } = product;

  const { masterVariant, name, description } = product.masterData.current;
  const descriptionSize = 150;
  const productDescription = description['en-US'].slice(0, descriptionSize);

  return (
    <Grid component='li' item key={id} lg={3} md={4} sm={6} sx={style.product}>
      <Box sx={style.margin}>
        <img src={masterVariant?.images[0]?.url} alt={name['en-US']} style={style.image} />
      </Box>

      <Box>
        <Typography component='h5' variant='h5' sx={{ ...style.text, ...style.margin }}>
          {name['en-US']}
        </Typography>
        <Typography component='p' sx={style.text}>
          {productDescription} <b> ...</b>
        </Typography>
      </Box>
    </Grid>
  );
};

export default ProdcutsItem;
