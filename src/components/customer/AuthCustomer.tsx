import { useLayoutEffect, useState } from 'react';

import { Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { postcodeValidatorExistsForCountry } from 'postcode-validator';
import { useNavigate, Link } from 'react-router-dom';

import authCustomer from 'api/customer/authCustomer';
import { customerAddressState, customerState } from 'components/customer/AuthCustomerState';
import styles from 'components/customer/AuthCustomerStyle';
import authCustomerStore from 'store/slices/customer/authCustomerSlice';
import { ICustomerRes, ICustomerAddress, ICustomerInfo } from 'types/customer';
import { getLimitDate } from 'utils/getLimitDate';
import notification from 'utils/notification';
import { emailValidate, passwordValidate, postCodeValidate, textAndNumberValidate, textValidate } from 'utils/validate';

const AuthCustomer = (): JSX.Element => {
  const [customerInfo, setCustomerState] = useState<ICustomerInfo>(customerState);

  const [address, setAddress] = useState<ICustomerAddress>(customerAddressState);

  const [billingAddress, setBillingAddress] = useState<ICustomerAddress>(customerAddressState);

  const { setCustomer, setError, customer } = authCustomerStore((state) => state);

  const [defaultAddress, setDefaultAddress] = useState<number | null>(null);
  const [isDefaultAddressChecked, checkDefaultAddress] = useState<boolean>(false);

  const dateLimit = 13;
  const dateInputMaxDate = getLimitDate(dateLimit);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (customer) {
      navigate('/');
    }
  }, [customer]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const addresses = isDefaultAddressChecked ? [address] : [address, billingAddress];
    const customerReq =
      defaultAddress !== null
        ? {
            ...customerInfo,
            addresses,
            shippingAddresses: [0],
            billingAddresses: [isDefaultAddressChecked ? 0 : 1],
            defaultBillingAddress: isDefaultAddressChecked ? 0 : 1,
            defaultShippingAddress: 0,
          }
        : {
            ...customerInfo,
            addresses: [{ ...address }],
          };

    authCustomer(customerReq)
      .then((res: ICustomerRes | string) => {
        typeof res !== 'string' ? setCustomer(res) : setError(res);

        if (typeof res === 'string') {
          notification('error', res);
        } else {
          notification('success', 'You have been successfully registered');
          navigate('/');
        }
      })
      .catch((err: Error) => {
        setError(err.message);
        notification('error', err.message);
      });
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const input = e.target as HTMLInputElement;
    const { name, value } = input;

    if (input.getAttribute('data-address')) {
      setAddress({ ...address, [name]: value });

      return;
    }
    if (input.getAttribute('data-billingaddress')) {
      setBillingAddress({ ...billingAddress, [name]: value });

      return;
    }
    setCustomerState({ ...customerInfo, [name]: value });
  };

  const changeDefaultAddress = (): void => {
    checkDefaultAddress(!isDefaultAddressChecked);

    if (!isDefaultAddressChecked) {
      setDefaultAddress(0);
      setBillingAddress({ ...address });

      return;
    }
    setBillingAddress({ ...customerAddressState });
  };

  return (
    <Box sx={styles.formContainer}>
      <Typography component='h1' variant='h3' sx={{ textAlign: 'center' }}>
        Sign Up
      </Typography>
      <Box component='form' onSubmit={onSubmit} onChange={onChange} sx={styles.formStyle}>
        <TextField
          label='Email Address'
          name='email'
          autoFocus
          size='small'
          type='email'
          // required
          value={customerInfo.email}
          error={!emailValidate(customerInfo.email)}
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
          // required
          value={customerInfo.password}
          error={!passwordValidate(customerInfo.password)}
          helperText='Must contain at least one character,special character,number and Upper character'
          sx={styles.textField}
        />
        <TextField
          label='First name'
          name='firstName'
          size='small'
          // required
          inputProps={{
            title: 'Must contain at least one character and no special characters or numbers',
          }}
          error={!textValidate(customerInfo.firstName)}
          helperText='Must contain at least one character and no special characters or numbers'
          sx={styles.textField}
        />
        <TextField
          label='Last name'
          name='lastName'
          size='small'
          // required
          inputProps={{
            title: 'Must contain at least one character and no special characters or numbers',
          }}
          value={customerInfo.lastName}
          error={!textValidate(customerInfo.lastName)}
          helperText='Must contain at least one character and no special characters or numbers'
          sx={styles.textField}
        />
        <TextField
          name='dayOfBirth'
          size='small'
          type='date'
          // required
          inputProps={{
            max: dateInputMaxDate,
          }}
          sx={styles.textField}
          value={customerInfo.dayOfBirth}
          error={customerInfo.dayOfBirth.length === 0}
          helperText='A valid date input ensuring the user is above a certain age (e.g., 13 years old or older)'
        />

        <Typography component='h4' variant='h6'>
          Shipping Address
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={isDefaultAddressChecked} onChange={changeDefaultAddress} />}
          label='Set as billing address'
        />
        <Box sx={styles.addressStyle}>
          <TextField
            label='Street'
            name='streetName'
            size='small'
            // required
            inputProps={{
              'data-address': true,
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
              'data-address': true,
              title: 'Must contain at least one character and no special characters or numbers',
            }}
            sx={styles.textField}
            value={address.city}
            error={!textValidate(address.city)}
            helperText='Must contain at least one character and no special characters or numbers'
          />
          <TextField
            label='Postal Code'
            name='postalCode'
            size='small'
            required
            inputProps={{
              'data-address': true,
              title:
                'Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)',
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
              'data-address': true,
              title: 'Must follow the format for the country (e.g."US" or "UK" )',
            }}
            sx={styles.textField}
            value={address.country}
            error={!postcodeValidatorExistsForCountry(address.country)}
            helperText='Must follow the format for the country (e.g."US" or "UK" )'
          />
        </Box>

        <Typography component='h4' variant='h6'>
          Billing Address
        </Typography>

        <Box sx={styles.addressStyle}>
          <TextField
            label='Street'
            name='streetName'
            size='small'
            // required
            inputProps={{
              'data-billingaddress': true,
              title: 'Must contain at least one character or number and no special characters',
            }}
            sx={styles.textField}
            value={billingAddress.streetName}
            error={!textAndNumberValidate(billingAddress.streetName)}
            helperText='Must contain at least one character or number and no special characters'
          />
          <TextField
            label='City'
            name='city'
            size='small'
            // required
            inputProps={{
              'data-billingaddress': true,
              title: 'Must contain at least one character and no special characters or numbers',
            }}
            sx={styles.textField}
            value={billingAddress.city}
            error={!textValidate(billingAddress.city)}
            helperText='Must contain at least one character and no special characters or numbers'
          />
          <TextField
            label='Postal Code'
            name='postalCode'
            size='small'
            required
            inputProps={{
              'data-billingaddress': true,
              title:
                'Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)',
            }}
            sx={styles.textField}
            value={billingAddress.postalCode}
            error={!postCodeValidate(address.postalCode, billingAddress.country)}
            helperText='Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)'
          />
          <TextField
            label='Country'
            name='country'
            size='small'
            required
            inputProps={{
              'data-billingaddress': true,
              title: 'Must follow the format for the country (e.g."US" or "UK" )',
            }}
            sx={styles.textField}
            value={billingAddress.country}
            error={!postcodeValidatorExistsForCountry(billingAddress.country)}
            helperText='Must follow the format for the country (e.g."US" or "UK" )'
          />
        </Box>

        <Button type='submit'>Sign Up</Button>
      </Box>{' '}
      <Box sx={styles.logInContainer}>
        <Box sx={styles.logInSpan}>Or</Box>
        <Link to='/logIn' style={styles.linkStyle}>
          Log In
        </Link>
      </Box>
    </Box>
  );
};

export default AuthCustomer;
