import { FC } from 'react';

import { TextField } from '@mui/material';

import styles from '../AuthCustomerStyle';

import { ICustomerInfo } from 'types/customer';
import { emailValidate, passwordValidate, textValidate } from 'utils/validate';

interface ICustomerInputsProps {
  customer: ICustomerInfo;
  dateInputMaxDate: string;
}

const CustomerInfoInputs: FC<ICustomerInputsProps> = ({ customer, dateInputMaxDate }): JSX.Element => (
  <>
    <TextField
      label='Email Address'
      name='email'
      autoFocus
      size='small'
      type='email'
      required
      value={customer.email}
      error={!emailValidate(customer.email)}
      sx={styles.textField}
    />
    <TextField
      label='Password'
      name='password'
      size='small'
      type='password'
      inputProps={{
        title: 'Must contain at least one character,special character,number and Upper character',
      }}
      required
      value={customer.password}
      error={!passwordValidate(customer.password)}
      helperText='Must contain at least one character,special character,number and Upper character'
      sx={styles.textField}
    />
    <TextField
      label='First name'
      name='firstName'
      size='small'
      required
      inputProps={{
        title: 'Must contain at least one character and no special characters or numbers',
      }}
      error={!textValidate(customer.firstName)}
      helperText='Must contain at least one character and no special characters or numbers'
      sx={styles.textField}
    />
    <TextField
      label='Last name'
      name='lastName'
      size='small'
      required
      inputProps={{
        title: 'Must contain at least one character and no special characters or numbers',
      }}
      value={customer.lastName}
      error={!textValidate(customer.lastName)}
      helperText='Must contain at least one character and no special characters or numbers'
      sx={styles.textField}
    />
    <TextField
      name='dayOfBirth'
      size='small'
      type='date'
      required
      inputProps={{
        max: dateInputMaxDate,
      }}
      sx={styles.textField}
      value={customer.dayOfBirth}
      error={customer.dayOfBirth.length === 0}
      helperText='A valid date input ensuring the user is above a certain age (e.g., 13 years old or older)'
    />
  </>
);

export default CustomerInfoInputs;
