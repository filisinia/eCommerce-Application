import { useState } from 'react';

import { Grid, TextField } from '@mui/material';

import styles from 'components/customer/CustomerStyle';
import { ICustomerInfo, ICustomerRes } from 'types/customer';
import { getLimitDate } from 'utils/getLimitDate';
import { emailValidate, textValidate } from 'utils/validate';

interface IEditProfileInfo {
  customer: ICustomerRes;
}

interface IEditState {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const EditProfileInfo = ({ customer }: IEditProfileInfo): JSX.Element => {
  const { email, firstName, lastName, dateOfBirth } = customer;

  const [info, setInfo] = useState<IEditState>({ email, firstName, lastName, dateOfBirth });

  console.log(firstName);

  const dateLimit = 13;
  const dateInputMaxDate = getLimitDate(dateLimit);

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

export default EditProfileInfo;
