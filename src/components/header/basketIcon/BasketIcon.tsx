import { FC } from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

type BasketIconProps = {
  isCartActive: boolean;
  itemsQuantity: number;
};

const BasketElem: FC<BasketIconProps> = ({ isCartActive, itemsQuantity }): JSX.Element => (
  <IconButton aria-label='cart' component={Link} to='/cart'>
    <Badge badgeContent={itemsQuantity} color='secondary'>
      <ShoppingCartIcon
        color='primary'
        style={{
          color: isCartActive ? 'rgb(255, 228, 196)' : '#1565c0',
        }}
      />
    </Badge>
  </IconButton>
);

export default BasketElem;
