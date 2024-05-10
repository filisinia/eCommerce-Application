import { useState } from 'react';

import { Box, Typography, TextField, Button } from '@mui/material';

import { IAuthUser } from '../../types/types';

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
  const [user, setUser] = useState<IAuthUser>(userState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(user);
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const input = e.target as HTMLInputElement;
    const { name, value } = input;

    setUser({ ...user, [name]: value });
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
