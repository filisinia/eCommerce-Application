import { AppBar, Button, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import authCustomerStore from 'store/slices/customer/authCustomerSlice';
import notification from 'utils/notification';

const Header = (): JSX.Element => {
  const { setCustomer, customer } = authCustomerStore((state) => state);

  const onLogout = (): void => {
    notification('success', 'You have been successfully logged out');
    setCustomer(null);
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
          <Button component={Link} to='/signup' variant='contained' sx={{ marginRight: '10px' }}>
            Sign up
          </Button>
          <Button component={Link} to='/login' variant='outlined' sx={{ marginRight: '10px' }}>
            Log in
          </Button>
          {customer ? (
            <Button component={Link} to='/' variant='outlined' onClick={onLogout}>
              Log out
            </Button>
          ) : (
            ''
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
