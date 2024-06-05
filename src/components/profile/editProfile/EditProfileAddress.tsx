import { useState } from 'react';

import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { postcodeValidatorExistsForCountry } from 'postcode-validator';

import {
  addCustomerAddress,
  postDefaultBillingAddress,
  postDefaultShippinggAddress,
} from 'api/customer/update/updateCustomer';
import styles from 'components/customer/CustomerStyle';
import customerSlice from 'store/slices/customer/customerSlice';
import { ICustomerAddress, ICustomerRes } from 'types/customer';
import notification from 'utils/notification';
import { isValidCustomerAddress, postCodeValidate, textAndNumberValidate, textValidate } from 'utils/validate';

interface IEditProfileAddress {
  address: ICustomerAddress;
  onClose: () => void;
  type: string;
}

const EditProfileAddress = ({ address, onClose, type }: IEditProfileAddress): JSX.Element => {
  const [newAddress, setNewAddress] = useState<ICustomerAddress>(address);
  const { streetName, city, country, postalCode } = newAddress;
  const [defaultShippingAddress, setDefaultShippingAddress] = useState<boolean>(false);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState<boolean>(false);
  const { setCustomer, customer } = customerSlice((state) => state);

  const changeDefaultShippingAddress = (): void => setDefaultShippingAddress(!defaultShippingAddress);
  const changeDefaultBillinggAddress = (): void => setDefaultBillingAddress(!defaultBillingAddress);

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const { name, value } = e.target as HTMLInputElement;

    setNewAddress({ ...newAddress, [name]: value });
  };

  const setDefaultAndBillingAddresses = (data: ICustomerRes): void => {
    const { addresses, version, id } = data;

    postDefaultShippinggAddress(version, addresses.pop()!.id, id)
      .then((res) => {
        if (typeof res !== 'string') {
          postDefaultBillingAddress(res.version, res.addresses.pop()!.id, res.id)
            .then((response) =>
              typeof response !== 'string' ? setCustomer(response) : notification('error', response),
            )
            .catch((err: Error) => notification('error', err.message));
        }
      })
      .catch((err: Error) => notification('error', err.message));
  };

  const setCustomerDefaultBillingAddresses = (data: ICustomerRes): void => {
    const { addresses, version, id } = data;

    postDefaultBillingAddress(version, addresses.pop()!.id, id)
      .then((response) => (typeof response !== 'string' ? setCustomer(response) : notification('error', response)))
      .catch((err: Error) => notification('error', err.message));
  };
  const setCustomerShippingBillingAddresses = (data: ICustomerRes): void => {
    const { addresses, version, id } = data;

    postDefaultShippinggAddress(version, addresses.pop()!.id, id)
      .then((response) => (typeof response !== 'string' ? setCustomer(response) : notification('error', response)))
      .catch((err: Error) => notification('error', err.message));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!isValidCustomerAddress(newAddress)) notification('error', 'Bad Validation');
    else {
      addCustomerAddress(customer!.version, newAddress, customer!.id)
        .then((data) => {
          if (typeof data !== 'string' && defaultShippingAddress && defaultBillingAddress) {
            setDefaultAndBillingAddresses(data);

            return;
          }
          if (typeof data !== 'string' && defaultBillingAddress) {
            setCustomerDefaultBillingAddresses(data);
          }
          if (typeof data !== 'string' && defaultShippingAddress) {
            setCustomerShippingBillingAddresses(data);
          }
          if (typeof data === 'string') {
            notification('error', data);
          }
          onClose();
        })
        .catch((err: Error) => notification('error', err.message));
    }
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
            {type === 'add' ? 'Create' : 'Edit'}
          </Button>

          <FormControlLabel
            sx={styles.textField}
            control={<Checkbox checked={defaultBillingAddress} onChange={changeDefaultBillinggAddress} />}
            label='Set as default billing address'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button type='submit' variant='contained' onClick={onClose} sx={{ width: '100%' }}>
            Close
          </Button>
          <FormControlLabel
            sx={styles.textField}
            control={<Checkbox checked={defaultShippingAddress} onChange={changeDefaultShippingAddress} />}
            label='Set as default shipping address'
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProfileAddress;
