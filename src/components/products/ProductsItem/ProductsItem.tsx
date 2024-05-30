import { FC } from 'react';

import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { IProduct } from 'types/products';

import 'components/products/ProductsItem/ProductItemStyle.scss';

interface IProdcutsItem {
  product: IProduct;
}

const ProdcutsItem: FC<IProdcutsItem> = ({ product }): JSX.Element => {
  const { id } = product;
  const { masterVariant, name } = product.masterData.current;
  const { value, discounted } = masterVariant.prices[0];

  // eslint-disable-next-line
  const description = masterVariant.attributes[0].value['en-US'];

  return (
    <Grid component='li' item key={id} lg={3} md={4} sm={6} className='product' sx={{ gridAutoColumns: '1fr' }}>
      <div className='product__container'>
        <Link to={`/products/${id}`}>
          <div className='product__img--container'>
            <img src={masterVariant?.images[0]?.url} alt={name['en-US']} className='product__img' />
          </div>
          <div className='product__info'>
            <h3 className='product__name'>{name['en-US']}</h3>
            {discounted && <span className='product__price'> {discounted.value.centAmount} USD</span>}
            <span className={discounted ? 'product__price product__discount' : 'product__price'}>
              {value.centAmount} USD
            </span>

            <p className='product__description'>{description}</p>
          </div>
        </Link>
      </div>
    </Grid>
  );
};

export default ProdcutsItem;
