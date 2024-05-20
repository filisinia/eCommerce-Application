import { useState } from 'react';
import { useEffect } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Typography, TextField, Button, IconButton, InputAdornment, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { validateEmail, validatePassword } from './LoginValidation';

import loginUser from 'api/customer/Login';
import { setTokens } from 'api/customer/Token';
import styles from 'components/customer/AuthCustomerStyle';
import authCustomerStore from 'store/slices/customer/authCustomerSlice';
import { ICustomerLoginSuccessData, ICustomerRes } from 'types/customer';

const LoginCustomer = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const { setCustomer, setError } = authCustomerStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = (): void => {
      try {
        const cookies = document.cookie.split(';').map((cookie) => cookie.trim());

        const accessToken = cookies.find((cookie) => cookie.startsWith('accessToken='));
        const refreshToken = cookies.find((cookie) => cookie.startsWith('refreshToken='));

        if (accessToken && refreshToken) {
          // const res = await loginUserWithTokens({ accessToken, refreshToken });
          // setCustomer(res);
          console.log('куки найдены');
          navigate('/');
        } else {
          console.log('куки не найдены');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuthentication();
  }, []);

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

    if (emailValidationError || passwordValidationError) {
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);

      return;
    }

    loginUser({ email, password })
      .then((res: ICustomerLoginSuccessData | string) => {
        if (typeof res === 'string') {
          setLoginError(res);
          setError(res);
        } else {
          setLoginError('');

          setTokens(res.access_token, res.refresh_token);

          navigate('/');
        }
      })
      .catch((error: string) => {
        setLoginError('Authorization error');
      });
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
        {loginError && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}
        <Button type='submit' variant='contained' sx={{ width: '230px' }}>
          Log in
        </Button>
      </Box>
    </Box>
  );
};

export default LoginCustomer;
