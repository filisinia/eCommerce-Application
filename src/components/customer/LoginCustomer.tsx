import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';

import { validateEmail, validatePassword } from './LoginValidation';

import styles from 'components/customer/AuthCustomerStyle';

const LoginCustomer = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleClickShowPassword = (): void => {
    setShowPassword((prev: boolean) => !prev);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (!emailValidationError && !passwordValidationError) {
      // Handle successful form submission
      console.log('Form submitted successfully', { email, password });
    }
  };

  return (
    <Box>
      <Typography component='h1' variant='h3' sx={{ textAlign: 'center' }}>
        Log in
      </Typography>
      <Box component='form' onSubmit={onSubmit} sx={styles.formStyle}>
        <TextField
          label='Email address'
          name='email'
          autoFocus
          size='small'
          value={email}
          onChange={handleEmailChange}
          error={Boolean(emailError)}
          helperText={emailError}
          sx={{ mb: 2, width: '230px' }}
        />
        <TextField
          label='Password'
          name='password'
          size='small'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          error={Boolean(passwordError)}
          helperText={passwordError}
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
        <Button type='submit' variant='contained' sx={{ width: '230px' }}>
          Log in
        </Button>
      </Box>
    </Box>
  );
};

export default LoginCustomer;
