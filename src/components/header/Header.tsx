import { useState } from 'react';

import { AccountCircleOutlined, ExitToAppOutlined } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button, Toolbar, Box, IconButton, Drawer } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { removeTokens } from 'api/customer/getAuthToken';
import authCustomerStore from 'store/slices/customer/customerSlice';
import notification from 'utils/notification';

const Header = (): JSX.Element => {
  const { setCustomer, customer } = authCustomerStore((state) => state);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isProductsActive = pathname === '/products';
  const isAboutActive = pathname === '/about';
  const isCartActive = pathname === '/cart';
  const isProfileActive = pathname === '/profile';

  const handleLogout = (): void => {
    notification('success', 'You have been successfully logged out');
    removeTokens();
    setCustomer(null);
  };

  const handleDrawerItemClick = (path: string): void => {
    setIsDrawerOpened(false);
    navigate(path);
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: '#0d0d0d' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button component={Link} to='/'>
              Store Name
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '10px' }}>
            <Button
              component={Link}
              to='/products'
              style={{
                fontWeight: isProductsActive ? 'bold' : 'normal',
                color: isProductsActive ? 'rgb(255, 228, 196)' : '#1565c0',
              }}
            >
              Products
            </Button>

            <Button
              component={Link}
              to='/about'
              style={{
                fontWeight: isAboutActive ? 'bold' : 'normal',
                color: isAboutActive ? 'rgb(255, 228, 196)' : '#1565c0',
              }}
            >
              About
            </Button>

            <IconButton component={Link} to='/cart'>
              <ShoppingCartIcon
                style={{
                  color: isCartActive ? 'rgb(255, 228, 196)' : '#1565c0',
                }}
              />
            </IconButton>

            {customer ? (
              <>
                <IconButton component={Link} to='/profile'>
                  <AccountCircleOutlined
                    style={{
                      color: isProfileActive ? 'rgb(255, 228, 196)' : '#1565c0',
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
        PaperProps={{ sx: { width: '40vw', padding: '20px 0' } }}
      >
        <Button onClick={() => handleDrawerItemClick('/')}>Main</Button>
        <Button onClick={() => handleDrawerItemClick('/products')}>Products</Button>
        <Button onClick={() => handleDrawerItemClick('/signup')}>Sign up</Button>
        <Button onClick={() => handleDrawerItemClick('/login')}>Log in</Button>
        {customer ? (
          <Button
            onClick={() => {
              handleDrawerItemClick('/');
              handleLogout();
            }}
          >
            Log out
          </Button>
        ) : (
          ''
        )}
      </Drawer>
    </>
  );
};

export default Header;
