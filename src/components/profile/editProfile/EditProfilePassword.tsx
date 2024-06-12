import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';

import { getCustomerPasswordToken, updateCustomerPassword } from 'api/customer/update/updateCustomer';
import styles from 'components/customer/CustomerStyle';
import customerSlice from 'store/slices/customer/customerSlice';
import notification from 'utils/notification';
import { passwordValidate } from 'utils/validate';

interface IEditProfilePassword {
  email: string;
  onClose: () => void;
}

const EditProfilePassword = ({ onClose, email }: IEditProfilePassword): JSX.Element => {
  const { setCustomer } = customerSlice((state) => state);

  const [newPassword, setNewPasswords] = useState<string>('');

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const changePasswordVisible = (): void => setPasswordVisible(!isPasswordVisible);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!passwordValidate(newPassword)) {
      notification('error', 'Bad Validation');
    } else {
      getCustomerPasswordToken(email)
        .then((res) => {
          if (typeof res !== 'string') {
            updateCustomerPassword(res.value, newPassword)
              .then((customerRes) =>
                typeof customerRes !== 'string' ? setCustomer(customerRes) : notification('error', customerRes),
              )
              .catch((err: Error) => notification('error', err.message));
          } else notification('error', res);
        })
        .catch((err: Error) => notification('error', err.message));
    }
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const { value } = e.target as HTMLInputElement;

    setNewPasswords(value);
  };

  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      onChange={onChange}
      sx={{ ...styles.formStyle, padding: '2rem', border: '.1rem solid black', borderRadius: '2rem' }}
    >
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction='column' justifyContent='center'>
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
            value={newPassword}
            error={!passwordValidate(newPassword)}
            helperText={
              !passwordValidate(newPassword) &&
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
