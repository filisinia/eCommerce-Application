import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';

import styles from 'components/customer/AuthCustomerStyle';

const LoginCustomer = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = (): void => {
    setShowPassword((prev: boolean) => !prev);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <Box>
      <Typography component='h1' variant='h3' sx={{ textAlign: 'center' }}>
        Log in
      </Typography>
      <Box component='form' onSubmit={onSubmit} onChange={onChange} sx={styles.formStyle}>
        <TextField
          label='Email adress'
          name='email'
          autoFocus
          size='small'
          type='email'
          sx={{ mb: 2, width: '230px' }}
        />
        <TextField
          label='Password'
          name='password'
          size='small'
          type={showPassword ? 'text' : 'password'}
          sx={{ mb: 2, width: '230px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type='submit'>Log in</Button>
      </Box>
    </Box>
  );
};

export default LoginCustomer;
