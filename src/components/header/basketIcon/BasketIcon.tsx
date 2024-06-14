import { FC } from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';

type BasketIconProps = {
  itemsQuantity: number;
};

const BasketElem: FC<BasketIconProps> = ({ itemsQuantity }): JSX.Element => (
  <IconButton aria-label='cart'>
    <Badge badgeContent={itemsQuantity} color='secondary'>
      <ShoppingCartIcon color='primary' />
    </Badge>
  </IconButton>
);

export default BasketElem;
