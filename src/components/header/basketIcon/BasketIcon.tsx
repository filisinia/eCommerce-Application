import { FC } from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

import cartStore from 'store/slices/cart/cartSlice';

type BasketIconProps = {
  isCartActive: boolean;
};

const BasketElem: FC<BasketIconProps> = ({ isCartActive }): JSX.Element => {
  const { cart } = cartStore((state) => state);

  return (
    <IconButton aria-label='cart' component={Link} to='/cart' sx={{ width: 'max-content', margin: '0 auto' }}>
      <Badge badgeContent={cart && cart.totalLineItemQuantity} color='secondary'>
        <ShoppingCartIcon
          color='primary'
          style={{
            color: isCartActive ? 'rgb(255, 228, 196)' : '#1565c0',
          }}
        />
      </Badge>
    </IconButton>
  );
};

export default BasketElem;
