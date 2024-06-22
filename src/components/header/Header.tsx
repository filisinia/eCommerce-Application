import { useLayoutEffect, useState } from 'react';

import { AccountCircleOutlined, ExitToAppOutlined } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Toolbar, Box, IconButton, Drawer } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { fetchCart } from 'api/cart/cart';
import { removeTokens } from 'api/customer/getAuthToken';
import BasketElem from 'components/header/basketIcon/BasketIcon';
import cartStore from 'store/slices/cart/cartSlice';
import authCustomerStore from 'store/slices/customer/customerSlice';
import notification from 'utils/notification';

const Header = (): JSX.Element => {
  const { setCustomer, customer } = authCustomerStore((state) => state);
  const { cart, setCart } = cartStore((state) => state);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const checkIsActivePage = (path: string): boolean => pathname === path;

  const handleLogout = (): void => {
    notification('success', 'You have been successfully logged out');
    removeTokens();
    setCustomer(null);
    setCart(null);
  };

  const handleDrawerItemClick = (path: string): void => {
    setIsDrawerOpened(false);
    navigate(path);
  };

  useLayoutEffect(() => {
    if (!cart && customer) {
      fetchCart(customer.id)
        .then((data) => {
          typeof data !== 'string' ? setCart(data) : notification('error', data);
        })
        .catch((err: Error) => notification('error', err.message));
    }
  });

  return (
    <>
      <AppBar sx={{ backgroundColor: '#0d0d0d' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button component={Link} to='/'>
              Home Harmony
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '10px' }}>
            <Button
              component={Link}
              to='/products'
              style={{
                fontWeight: checkIsActivePage('/products') ? 'bold' : 'normal',
                color: checkIsActivePage('/products') ? 'rgb(255, 228, 196)' : '#1565c0',
              }}
            >
              Products
            </Button>

            <Button
              component={Link}
              to='/about'
              style={{
                fontWeight: checkIsActivePage('/about') ? 'bold' : 'normal',
                color: checkIsActivePage('/about') ? 'rgb(255, 228, 196)' : '#1565c0',
              }}
            >
              About
            </Button>
            <BasketElem isCartActive={checkIsActivePage('/cart')} />
            {customer ? (
              <>
                <IconButton component={Link} to='/profile'>
                  <AccountCircleOutlined
                    style={{
                      color: checkIsActivePage('/profile') ? 'rgb(255, 228, 196)' : '#1565c0',
                    }}
                  />
                </IconButton>
                <IconButton component={Link} to='/' onClick={handleLogout}>
                  <ExitToAppOutlined color='primary' />
                </IconButton>
              </>
            ) : (
              <>
                <Button component={Link} to='/signup' variant='contained'>
                  Sign up
                </Button>
                <Button component={Link} to='/login' variant='outlined'>
                  Log in
                </Button>
              </>
            )}
          </Box>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={() => setIsDrawerOpened(true)}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer
        anchor='right'
        open={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        PaperProps={{ sx: { width: '60vw', padding: '20px 0' } }}
      >
        <Button
          onClick={() => handleDrawerItemClick('/')}
          style={{
            color: checkIsActivePage('/') ? 'rgb(179 127 65)' : '#1565c0',
          }}
        >
          Main
        </Button>
        <Button
          onClick={() => handleDrawerItemClick('/products')}
          style={{
            color: checkIsActivePage('/products') ? 'rgb(179 127 65)' : '#1565c0',
          }}
        >
          Products
        </Button>
        <Button onClick={() => handleDrawerItemClick('/cart')}>
          <BasketElem isCartActive={checkIsActivePage('/cart')} />
        </Button>
        <Button
          onClick={() => handleDrawerItemClick('/about')}
          style={{
            color: checkIsActivePage('/about') ? 'rgb(179 127 65)' : '#1565c0',
          }}
        >
          About
        </Button>
        {customer ? (
          <>
            <Button
              onClick={() => handleDrawerItemClick('/profile')}
              style={{
                color: checkIsActivePage('/profile') ? 'rgb(179 127 65)' : '#1565c0',
              }}
            >
              Profile
            </Button>
            <Button
              onClick={() => {
                handleDrawerItemClick('/');
                handleLogout();
              }}
            >
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => handleDrawerItemClick('/signup')}
              style={{
                color: checkIsActivePage('/signup') ? 'rgb(179 127 65)' : '#1565c0',
              }}
            >
              Sign up
            </Button>
            <Button
              onClick={() => handleDrawerItemClick('/login')}
              style={{
                color: checkIsActivePage('/login') ? 'rgb(179 127 65)' : '#1565c0',
              }}
            >
              Log in
            </Button>
          </>
        )}
      </Drawer>
    </>
  );
};

export default Header;
