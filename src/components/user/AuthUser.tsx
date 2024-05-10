import { Box, Typography, TextField } from '@mui/material';

const AuthUser = (): JSX.Element => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <Box>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <Box component='form' onSubmit={onSubmit}>
        <TextField
          margin='normal'
          required
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
        />
      </Box>
    </Box>
  );
};

export default AuthUser;
