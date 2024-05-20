import { FC } from 'react';

import { Box, TextField } from '@mui/material';
import { postcodeValidatorExistsForCountry } from 'postcode-validator';

import styles from '../AuthCustomerStyle';

import { ICustomerAddress } from 'types/customer';
import { postCodeValidate, textAndNumberValidate, textValidate } from 'utils/validate';

interface IAdressCustomerInputs {
  address: ICustomerAddress;
  data: string;
}

const AdressCustomerInputs: FC<IAdressCustomerInputs> = ({ data, address }): JSX.Element => (
  <Box sx={styles.addressStyle}>
    <TextField
      label='Street'
      name='streetName'
      size='small'
      // required
      inputProps={{
        'data-address': data,
        title: 'Must contain at least one character or number and no special characters',
      }}
      sx={styles.textField}
      value={address.streetName}
      error={!textAndNumberValidate(address.streetName)}
      helperText='Must contain at least one character or number and no special characters'
    />
    <TextField
      label='City'
      name='city'
      size='small'
      // required
      inputProps={{
        'data-address': data,
        title: 'Must contain at least one character and no special characters or numbers',
      }}
      sx={styles.textField}
      value={address.city}
      error={!textValidate(address.city)}
      helperText='Must contain at least one character and no special characters or numbers'
    />
    <TextField
      label='Posatal Code'
      name='postalCode'
      size='small'
      required
      inputProps={{
        'data-address': data,
        title: 'Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)',
      }}
      sx={styles.textField}
      value={address.postalCode}
      error={!postCodeValidate(address.postalCode, address.country)}
      helperText='Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)'
    />
    <TextField
      label='Country'
      name='country'
      size='small'
      required
      inputProps={{
        'data-address': data,
        title: 'Must follow the format for the country (e.g."US" or "UK" )',
      }}
      sx={styles.textField}
      value={address.country}
      error={!postcodeValidatorExistsForCountry(address.country)}
      helperText='Must follow the format for the country (e.g."US" or "UK" )'
    />
  </Box>
);

export default AdressCustomerInputs;
