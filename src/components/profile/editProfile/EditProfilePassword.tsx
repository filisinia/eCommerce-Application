import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';

import styles from 'components/customer/CustomerStyle';
import { passwordValidate } from 'utils/validate';

interface IEditProfilePassword {
  password: string;
  onClose: () => void;
}

const EditProfilePassword = ({ password, onClose }: IEditProfilePassword): JSX.Element => {
  const [passwords, setPasswords] = useState<{ oldPassword: string; newPassword: string }>({
    oldPassword: password,
    newPassword: '',
  });

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const changePasswordVisible = (): void => setPasswordVisible(!isPasswordVisible);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const { name, value } = e.target as HTMLInputElement;

    setPasswords({ ...passwords, [name]: value });
  };

  return (
    <Box component='form' onSubmit={onSubmit} onChange={onChange} sx={{ ...styles.formStyle, padding: '0 1rem' }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction='column' justifyContent='center'>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Old Password'
            name='oldPassword'
            size='small'
            type={isPasswordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton aria-label='toggle password visibility' onClick={changePasswordVisible} edge='end'>
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            value={passwords.oldPassword}
            error={!passwordValidate(passwords.oldPassword)}
            helperText={
              !passwordValidate(passwords.oldPassword) &&
              'Must contain at least one character,special character,number and Upper character'
            }
            sx={styles.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label='New Password'
            name='newPassword'
            size='small'
            type={isPasswordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton aria-label='toggle password visibility' onClick={changePasswordVisible} edge='end'>
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            value={passwords.newPassword}
            error={!passwordValidate(passwords.newPassword)}
            helperText={
              !passwordValidate(passwords.newPassword) &&
              'Must contain at least one character,special character,number and Upper character'
            }
            sx={styles.textField}
          />
        </Grid>
      </Grid>

      <Box sx={{ width: '100%' }}>
        <Button type='submit' variant='contained' sx={{ width: '100%', mb: '1rem' }}>
          Edit
        </Button>
        <Button type='submit' variant='contained' sx={{ width: '100%' }} onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfilePassword;
