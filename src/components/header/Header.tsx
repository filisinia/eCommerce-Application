import { AppBar, Button, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import authCustomerStore from 'store/slices/customer/authCustomerSlice';
import successNotification from 'utils/successNotification';

const Header = (): JSX.Element => {
  const { setCustomer, customer } = authCustomerStore((state) => state);

  const onLogout = (): void => {
    successNotification('You have been successfully logged out');
    setCustomer(null);
  };

  const testAlert = (): void => {
    successNotification('You have been successfully logged out');
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
          <Button onClick={testAlert} variant='outlined' sx={{ marginRight: '10px' }}>
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
