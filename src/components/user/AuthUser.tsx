import { useState } from 'react';

import { Box, Typography, TextField, Button } from '@mui/material';

import authUser from '../../api/user/Auth';
import { ICustomer, IUser } from '../../types/user';
import authUserStore from '../../zustand/user/auth/authUserState';

interface IUserState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dayOfBirth: string;
  street: string;
  city: string;
  postCode: string;
  country: string;
}

const userState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dayOfBirth: '',
  street: '',
  city: '',
  postCode: '',
  country: '',
};

const formStyle = { display: 'flex', flexDirection: 'column', rowGap: '2rem', margin: '2rem', alignItems: 'center' };

const AuthUser = (): JSX.Element => {
  const [customer, setCustomer] = useState<IUserState>(userState);

  const { setUser, setError } = authUserStore((state) => state);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    authUser({
      email: 'johndoe3@example.com',
      firstName: 'John',
      lastName: 'Doe',
      dayOfBirth: 'dayOfBirth',
      password: 'secret123',
      addresses: [{ street: 'street', city: 'city', postCode: 'postCode', country: 'KI' }],
    })
      .then((res: ICustomer | string) => {
        if (typeof res !== 'string') {
          setUser(res);
        } else {
          // eslint-disable-next-line
          setError(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const input = e.target as HTMLInputElement;
    const { name, value } = input;

    setCustomer({ ...customer, [name]: value });
  };

  return (
    <Box>
      <Typography component='h1' variant='h3' sx={{ textAlign: 'center' }}>
        Sign in
      </Typography>
      <Box component='form' onSubmit={onSubmit} onChange={onChange} sx={formStyle}>
        <TextField label='Email Address' name='email' autoFocus />
        <TextField label='Password' name='password' />
        <TextField label='First name' name='firstName' />
        <TextField label='Last name' name='lastName' />
        <TextField label='Date of birth' name='dayOfBirth' />
        <TextField label='Password' name='password' />

        <Typography component='h3' variant='h5'>
          Address
        </Typography>

        <TextField label='Street' name='street' />
        <TextField label='City' name='city' />
        <TextField label='Posatal Code' name='postCode' />
        <TextField label='Country' name='country' />
        <Button type='submit'>Sign Up</Button>
      </Box>
    </Box>
  );
};

export default AuthUser;
