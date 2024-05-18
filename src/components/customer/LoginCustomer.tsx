import { Box, Typography, TextField, Button } from '@mui/material';

import styles from 'components/customer/AuthCustomerStyle';

const LoginCustomer = (): JSX.Element => {
  const asd = '';

  return (
    <Box>
      <Typography component='h1' variant='h3' sx={{ textAlign: 'center' }}>
        Log in
      </Typography>
      <Box component='form' sx={styles.formStyle}>
        <TextField label='Login' name='login' autoFocus size='small' type='login' />
        <TextField label='Password' name='password' autoFocus size='small' type='password' />
        <Button type='submit'>Log in</Button>
      </Box>
    </Box>
  );
};

export default LoginCustomer;
