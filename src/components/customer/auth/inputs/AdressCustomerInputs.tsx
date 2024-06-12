import { FC, memo } from 'react';

import { Box, TextField, Typography, Grid } from '@mui/material';
import { postcodeValidatorExistsForCountry } from 'postcode-validator';

import styles from 'components/customer/CustomerStyle';
import { ICustomerAddress } from 'types/customer';
import { postCodeValidate, textAndNumberValidate, textValidate } from 'utils/validate';

interface IAdressCustomerInputs {
  address: ICustomerAddress;
  data?: string;
  title: string;
}

const AdressCustomerInputs: FC<IAdressCustomerInputs> = ({ data, address, title }): JSX.Element => (
  <>
    <Typography component='h4' variant='h6'>
      {title}
    </Typography>
    <Box sx={styles.addressStyle}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Street'
            name='streetName'
            size='small'
            required
            inputProps={{
              'data-address': data,
            }}
            sx={styles.textField}
            value={address.streetName}
            error={!textAndNumberValidate(address.streetName)}
            helperText={
              !textAndNumberValidate(address.streetName) &&
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
            inputProps={{
              'data-address': data,
            }}
            sx={styles.textField}
            value={address.city}
            error={!textValidate(address.city)}
            helperText={
              !textValidate(address.city) && 'Must contain at least one character and no special characters or numbers'
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label='Posatal Code'
            name='postalCode'
            size='small'
            required
            inputProps={{
              'data-address': data,
            }}
            sx={styles.textField}
            value={address.postalCode}
            error={!postCodeValidate(address.postalCode, address.country)}
            helperText={
              !postCodeValidate(address.postalCode, address.country) &&
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
            inputProps={{
              'data-address': data,
            }}
            sx={styles.textField}
            value={address.country}
            error={!postcodeValidatorExistsForCountry(address.country)}
            helperText={
              !postcodeValidatorExistsForCountry(address.country) &&
              'Must follow the format for the country (e.g."US" or "UK" )'
            }
          />
        </Grid>
      </Grid>
    </Box>
  </>
);

export default memo(AdressCustomerInputs);
