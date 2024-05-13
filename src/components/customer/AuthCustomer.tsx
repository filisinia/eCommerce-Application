import { useState } from 'react';

import { Box, Typography, TextField, Button } from '@mui/material';

import authUser from '../../api/customer/Auth';
import authCustomerStore from '../../store/slices/customer/authCustomerSlice';
import { ICustomerRes, ICustomerAddress, ICustomerInfo } from '../../types/customer';

import { customerAddressState, customerState } from './AuthCustomerState';
import styles from './AuthCustomerStyle';

const AuthCustomer = (): JSX.Element => {
  const [customer, setCustomerState] = useState<ICustomerInfo>(customerState);

  const [address, setAddress] = useState<ICustomerAddress>(customerAddressState);

  const { setCustomer, setError } = authCustomerStore((state) => state);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    authUser({ ...customer, addresses: [address] })
      .then((res: ICustomerRes | string) => {
        typeof res !== 'string' ? setCustomer(res) : setError(res);
      })
      .catch((err: Error) => setError(err.message));
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const input = e.target as HTMLInputElement;
    const { name, value } = input;

    input.getAttribute('data-address')
      ? setAddress({ ...address, [name]: value })
      : setCustomerState({ ...customer, [name]: value });

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
          required
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
      </Box>
    </Box>
  );
};

export default AuthCustomer;
