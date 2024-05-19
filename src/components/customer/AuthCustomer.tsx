import { useEffect, useState } from 'react';

import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authUser from 'api/customer/Auth';
import { customerAddressState, customerState } from 'components/customer/AuthCustomerState';
import styles from 'components/customer/AuthCustomerStyle';
import authCustomerStore from 'store/slices/customer/authCustomerSlice';
import { ICustomerRes, ICustomerAddress, ICustomerInfo } from 'types/customer';
import errorNotification from 'utils/errorNotification';

const AuthCustomer = (): JSX.Element => {
  const [customerInfo, setCustomerState] = useState<ICustomerInfo>(customerState);

  const [address, setAddress] = useState<ICustomerAddress>(customerAddressState);

  const { setCustomer, setError, customer } = authCustomerStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    // if (customer) {
    //   navigate('/');
    // }
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    authUser({ ...customerInfo, addresses: [address] })
      .then((res: ICustomerRes | string) => {
        typeof res !== 'string' ? setCustomer(res) : setError(res);

        if (typeof res === 'string') {
          errorNotification(res);
        } else {
          navigate('/');
        }
      })
      .catch((err: Error) => {
        setError(err.message);
        errorNotification(err.message);
      });
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const input = e.target as HTMLInputElement;
    const { name, value } = input;

    input.getAttribute('data-address')
      ? setAddress({ ...address, [name]: value })
      : setCustomerState({ ...customerInfo, [name]: value });

    input.getAttribute('data-address');
  };

  return (
    <Box>
      <Typography component='h1' variant='h3' sx={{ textAlign: 'center' }}>
        Sign in
      </Typography>
      <Box component='form' onSubmit={onSubmit} onChange={onChange} sx={styles.formStyle}>
        <TextField label='Email Address' name='email' autoFocus size='small' type='email' />
        <TextField label='Password' name='password' size='small' type='password' />
        <TextField
          label='First name'
          name='firstName'
          size='small'
          inputProps={{
            pattern: '[A-Za-z]{1,}',
            title: 'Must contain at least one character and no special characters or numbers',
          }}
        />
        <TextField
          label='Last name'
          name='lastName'
          size='small'
          inputProps={{
            pattern: '[A-Za-z]{1,}',
            title: 'Must contain at least one character and no special characters or numbers',
          }}
        />
        <TextField name='dayOfBirth' size='small' type='date' />

        <Typography component='h3' variant='h5'>
          Address
        </Typography>
        <Box sx={styles.addressStyle}>
          <TextField
            label='Street'
            name='streetName'
            size='small'
            inputProps={{
              'data-address': true,
            }}
          />
          <TextField
            label='City'
            name='city'
            size='small'
            inputProps={{
              'data-address': true,
            }}
          />
          <TextField
            label='Posatal Code'
            name='postalCode'
            size='small'
            inputProps={{
              'data-address': true,
            }}
          />
          <TextField
            label='Country'
            name='country'
            size='small'
            inputProps={{
              'data-address': true,
            }}
          />
        </Box>

        <Button type='submit'>Sign Up</Button>
      </Box>{' '}
      <Box sx={styles.logInContainer}>
        <Box sx={styles.logInSpan}>Or</Box>
        <Link to='/logIn' style={styles.linkStyle}>
          Log In
        </Link>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default AuthCustomer;
