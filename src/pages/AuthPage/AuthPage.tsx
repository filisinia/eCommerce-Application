import { useLayoutEffect } from 'react';

import { Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import AuthCustomer from 'components/customer/auth/AuthCustomer';
import authCustomerStore from 'store/slices/customer/customerSlice';

const AuthPage = (): JSX.Element => {
  const { customer } = authCustomerStore((state) => state);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (customer) navigate('/');
  }, []);

  return (
    <>
      <AuthCustomer />
      <Box sx={{ m: '10px auto', width: '8rem', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ paddingRight: '1rem', display: 'inline' }}>Or</Box>
        <Link
          to='/logIn'
          style={{
            textDecoration: 'none',
            color: 'blue',
          }}
        >
          Log In
        </Link>
      </Box>
    </>
  );
};

export default AuthPage;
