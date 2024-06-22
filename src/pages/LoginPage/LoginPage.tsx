import { useLayoutEffect } from 'react';

import { Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import LoginCustomer from 'components/customer/login/LoginCustomer';
import authCustomerStore from 'store/slices/customer/customerSlice';

const LoginPage = (): JSX.Element => {
  const { customer } = authCustomerStore((state) => state);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (customer) navigate('/');
  }, []);

  return (
    <>
      <LoginCustomer />
      <Box sx={{ m: '10px auto', width: '8rem', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ paddingRight: '1rem', display: 'inline' }}>Or</Box>
        <Link
          to='/signUp'
          style={{
            textDecoration: 'none',
            color: 'blue',
          }}
        >
          Sign up
        </Link>
      </Box>
    </>
  );
};

export default LoginPage;
