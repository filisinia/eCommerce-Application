import { useState } from 'react';

import { Box, Button, Grid, TextField } from '@mui/material';
import { postcodeValidatorExistsForCountry } from 'postcode-validator';

import styles from 'components/customer/CustomerStyle';
import { ICustomerAddress } from 'types/customer';
import { postCodeValidate, textAndNumberValidate, textValidate } from 'utils/validate';

interface IEditProfileAddress {
  address: ICustomerAddress;
  onClose: () => void;
}

const EditProfileAddress = ({ address, onClose }: IEditProfileAddress): JSX.Element => {
  const [newAddress, setNewAddress] = useState<ICustomerAddress>(address);
  const { streetName, city, country, postalCode } = newAddress;

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const { name, value } = e.target as HTMLInputElement;

    setNewAddress({ ...newAddress, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      onChange={onChange}
      sx={{ ...styles.addressStyle, padding: '2rem', border: '.1rem solid black', borderRadius: '2rem' }}
    >
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Street'
            name='streetName'
            size='small'
            required
            sx={styles.textField}
            value={streetName}
            error={!textAndNumberValidate(streetName)}
            helperText={
              !textAndNumberValidate(streetName) &&
              'Must contain at least one character or number and no special characters'
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label='City'
            name='city'
            size='small'
            required
            sx={styles.textField}
            value={city}
            error={!textValidate(city)}
            helperText={
              !textValidate(city) && 'Must contain at least one character and no special characters or numbers'
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label='Posatal Code'
            name='postalCode'
            size='small'
            required
            sx={styles.textField}
            value={postalCode}
            error={!postCodeValidate(postalCode, country)}
            helperText={
              !postCodeValidate(postalCode, country) &&
              'Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)'
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label='Country'
            name='country'
            size='small'
            required
            sx={styles.textField}
            value={country}
            error={!postcodeValidatorExistsForCountry(country)}
            helperText={
              !postcodeValidatorExistsForCountry(country) &&
              'Must follow the format for the country (e.g."US" or "UK" )'
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button type='submit' variant='contained' sx={{ width: '100%' }}>
            Edit
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button type='submit' variant='contained' onClick={onClose} sx={{ width: '100%' }}>
            Close
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProfileAddress;
