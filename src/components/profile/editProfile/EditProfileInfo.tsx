import { useState } from 'react';

import { Box, Button, Grid, TextField } from '@mui/material';

import styles from 'components/customer/CustomerStyle';
import { validateEmail } from 'components/customer/login/LoginValidation';
import { updateCustomerInfo } from 'components/customer/update/updateCustomer';
import customerSlice from 'store/slices/customer/customerSlice';
import { ICustomerRes } from 'types/customer';
import { getLimitDate } from 'utils/getLimitDate';
import notification from 'utils/notification';
import { emailValidate, textValidate } from 'utils/validate';

interface IEditProfileInfo {
  customer: ICustomerRes;
  onClose: () => void;
}

interface IEditState {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const EditProfileInfo = ({ customer, onClose }: IEditProfileInfo): JSX.Element => {
  const { setCustomer } = customerSlice((state) => state);

  const [info, setInfo] = useState<IEditState>({ ...customer });
  const { email, firstName, lastName, dateOfBirth } = info;
  const { id, version } = customer;

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const { name, value } = e.target as HTMLInputElement;

    setInfo({ ...info, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!validateEmail(email) && !textValidate(firstName) && !textValidate(lastName)) {
      notification('error', 'Bad Validation');

      return;
    }
    const updatedCustomer = { ...info, id, version };

    updateCustomerInfo(updatedCustomer)
      .then((res) => (typeof res !== 'string' ? setCustomer(res) : notification('error', res)))
      .catch((err: Error) => notification('error', err.message));
  };
  const dateLimit = 13;
  const dateInputMaxDate = getLimitDate(dateLimit);

  return (
    <Box component='form' onSubmit={onSubmit} onChange={onChange} sx={{ ...styles.formStyle, padding: '0 1rem' }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction='column' justifyContent='center'>
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

export default EditProfileInfo;
