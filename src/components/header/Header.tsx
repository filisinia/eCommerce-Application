import { AppBar, Button, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import authCustomerStore from 'store/slices/customer/authCustomerSlice';

const Header = (): JSX.Element => {
  const { setCustomer } = authCustomerStore((state) => state);

  const onLogout = (): void => setCustomer(null);

  return (
    <>
      <AppBar sx={{ backgroundColor: '#0d0d0d' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button component={Link} to='/'>
              Store Name
            </Button>
          </Box>
          <Button component={Link} to='/login' variant='outlined' sx={{ marginRight: '10px' }}>
            Log in
          </Button>
          <Button component={Link} to='/signup' variant='contained' sx={{ marginRight: '10px' }}>
            Sign up
          </Button>
          <Button variant='outlined' onClick={onLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
