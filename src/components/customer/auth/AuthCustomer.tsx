import { useState } from 'react';

import { Box, Typography, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { authCustomer } from 'api/customer/authCustomer';
import { customerAddressState, customerState } from 'components/customer/auth/AuthCustomerState';
import AdressCustomerInputs from 'components/customer/auth/inputs/AdressCustomerInputs';
import CustomerInfoInputs from 'components/customer/auth/inputs/CustomerInfoInputs';
import styles from 'components/customer/CustomerStyle';
import customerSlice from 'store/slices/customer/customerSlice';
import { ICustomerRes, ICustomerAddress, ICustomerInfo } from 'types/customer';
import { getLimitDate } from 'utils/getLimitDate';
import notification from 'utils/notification';
import { validateCustomerAuth } from 'utils/validate';

const AuthCustomer = (): JSX.Element => {
  const [customerInfo, setCustomerState] = useState<ICustomerInfo>(customerState);
  const [address, setAddress] = useState<ICustomerAddress>(customerAddressState);
  const { setCustomer, setError } = customerSlice((state) => state);

  const [billingAddress, setBillingAddress] = useState<ICustomerAddress>(customerAddressState);
  const [defaultAddress, setDefaultAddress] = useState<number | null>(null);
  const [isTheSameAddress, checkTheSameAddress] = useState<boolean>(false);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState<boolean>(false);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState<boolean>(false);
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const dateLimit = 13;
  const dateInputMaxDate = getLimitDate(dateLimit);

  const navigate = useNavigate();

  const getDefaultBillingAddress = (): null | number => {
    if (isTheSameAddress && defaultBillingAddress) return 0;

    return defaultBillingAddress ? 1 : null;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setDisabled(true);

    const addresses = isTheSameAddress ? [address] : [address, billingAddress];

    const customerReq = {
      ...customerInfo,
      addresses: defaultAddress ? [{ ...address }] : addresses,
      shippingAddresses: [0],
      billingAddresses: [isTheSameAddress ? 0 : 1],
      defaultBillingAddress: getDefaultBillingAddress(),
      defaultShippingAddress: defaultShippingAddress ? 0 : null,
    };

    if (!validateCustomerAuth(customerInfo, address, billingAddress)) {
      notification('error', 'Bad Validation');
    } else {
      authCustomer(customerReq)
        .then((res: ICustomerRes | string) => {
          typeof res !== 'string' ? setCustomer(res) : setError(res);

          if (typeof res === 'string') {
            notification('error', res);
          } else {
            navigate('/');
            notification('success', 'You have been registered');
          }
        })
        .catch((err: Error) => {
          setError(err.message);
          notification('error', err.message);
        });
    }

    const disabledTime = 500;

    setTimeout(() => setDisabled(false), disabledTime);
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const input = e.target as HTMLInputElement;
    const { name, value } = input;

    const addressAttribute = input.getAttribute('data-address');

    if (addressAttribute) {
      addressAttribute === 'shipping'
        ? setAddress({ ...address, [name]: value })
        : setBillingAddress({ ...billingAddress, [name]: value });
    } else {
      setCustomerState({ ...customerInfo, [name]: value });
    }
  };

  const changeBillingAddress = (): void => {
    checkTheSameAddress(!isTheSameAddress);

    if (!isTheSameAddress) {
      setDefaultAddress(0);
      setBillingAddress({ ...address });
    } else {
      setBillingAddress({ ...customerAddressState });
    }
  };

  const changeDefaultShippingAddress = (): void => setDefaultShippingAddress(!defaultShippingAddress);
  const changeDefaultBillinggAddress = (): void => setDefaultBillingAddress(!defaultBillingAddress);

  return (
    <Box sx={styles.formContainer}>
      <Typography component='h2' variant='h3' sx={{ textAlign: 'center' }}>
        Sign Up
      </Typography>
      <Box component='form' onSubmit={onSubmit} onChange={onChange} sx={styles.formStyle}>
        <CustomerInfoInputs customer={customerInfo} dateInputMaxDate={dateInputMaxDate} />

        <AdressCustomerInputs address={address} data='shipping' title='Shipping Address' />

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              sx={styles.textField}
              control={<Checkbox checked={defaultShippingAddress} onChange={changeDefaultShippingAddress} />}
              label='Set as default shipping address'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              sx={styles.textField}
              control={<Checkbox checked={isTheSameAddress} onChange={changeBillingAddress} />}
              label='Set as billing address'
            />
          </Grid>
        </Grid>

        <AdressCustomerInputs address={billingAddress} data='billing' title='Billing Address' />

        <FormControlLabel
          sx={styles.textField}
          control={<Checkbox checked={defaultBillingAddress} onChange={changeDefaultBillinggAddress} />}
          label='Set as default billing address'
        />

        <Button disabled={isDisabled} type='submit' variant='contained' sx={styles.formButton}>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default AuthCustomer;
