import { FC, useState, memo } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, Grid } from '@mui/material';

import styles from 'components/customer/CustomerStyle';
import { ICustomerInfo } from 'types/customer';
import { emailValidate, passwordValidate, textValidate } from 'utils/validate';

interface ICustomerInputsProps {
  customer: ICustomerInfo;
  dateInputMaxDate: string;
}

const CustomerInfoInputs: FC<ICustomerInputsProps> = ({ customer, dateInputMaxDate }): JSX.Element => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const { email, password, firstName, lastName, dateOfBirth } = customer;

  const changePasswordVisible = (): void => setPasswordVisible(!isPasswordVisible);

  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          label='Email Address'
          name='email'
          autoFocus
          size='small'
          type='email'
          required
          value={email}
          error={!emailValidate(email)}
          sx={styles.textField}
          helperText={!emailValidate(email) && 'Must contain a valide email'}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label='Password'
          name='password'
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
          value={password}
          error={!passwordValidate(password)}
          helperText={
            !passwordValidate(password) &&
            'Must contain at least one character,special character,number and Upper character'
          }
          sx={styles.textField}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label='First name'
          name='firstName'
          size='small'
          required
          value={firstName}
          error={!textValidate(firstName)}
          helperText={
            !textValidate(firstName) && 'Must contain at least one character and no special characters or numbers'
          }
          sx={styles.textField}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label='Last name'
          name='lastName'
          size='small'
          required
          value={lastName}
          error={!textValidate(lastName)}
          helperText={
            !textValidate(lastName) && 'Must contain at least one character and no special characters or numbers'
          }
          sx={styles.textField}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          name='dateOfBirth'
          size='small'
          type='date'
          required
          inputProps={{
            max: dateInputMaxDate,
          }}
          sx={styles.textField}
          value={dateOfBirth}
          error={dateOfBirth.length === 0}
          helperText={
            dateOfBirth.length === 0 &&
            'A valid date input ensuring the user is above a certain age (e.g., 13 years old or older)'
          }
        />
      </Grid>
    </Grid>
  );
};

export default memo(CustomerInfoInputs);
