import { useState } from 'react';

import { Box, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import authCustomer from 'api/customer/authCustomer';
import { customerAddressState, customerState } from 'components/customer/auth/AuthCustomerState';
import AdressCustomerInputs from 'components/customer/auth/inputs/AdressCustomerInputs';
import CustomerInfoInputs from 'components/customer/auth/inputs/CustomerInfoInputs';
import styles from 'components/customer/AuthCustomerStyle';
import authCustomerStore from 'store/slices/customer/authCustomerSlice';
import { ICustomerRes, ICustomerAddress, ICustomerInfo } from 'types/customer';
import { getLimitDate } from 'utils/getLimitDate';
import notification from 'utils/notification';

const AuthCustomer = (): JSX.Element => {
  const [customerInfo, setCustomerState] = useState<ICustomerInfo>(customerState);
  const [address, setAddress] = useState<ICustomerAddress>(customerAddressState);
  const { setCustomer, setError } = authCustomerStore((state) => state);

  const [billingAddress, setBillingAddress] = useState<ICustomerAddress>(customerAddressState);
  const [defaultAddress, setDefaultAddress] = useState<number | null>(null);
  const [isTheSameAddress, checkTheSameAddress] = useState<boolean>(false);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState<boolean>(false);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState<boolean>(false);

  const dateLimit = 13;
  const dateInputMaxDate = getLimitDate(dateLimit);

  const navigate = useNavigate();

  const getDefaultBillingAddress = (): null | number => {
    if (isTheSameAddress && defaultBillingAddress) return 0;

    return defaultBillingAddress ? 1 : null;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const addresses = isTheSameAddress ? [address] : [address, billingAddress];

    const customerReq = {
      ...customerInfo,
      addresses: defaultAddress ? [{ ...address }] : addresses,
      shippingAddresses: [0],
      billingAddresses: [isTheSameAddress ? 0 : 1],
      defaultBillingAddress: getDefaultBillingAddress(),
      defaultShippingAddress: defaultShippingAddress ? 0 : null,
    };

    authCustomer(customerReq)
      .then((res: ICustomerRes | string) => {
        typeof res !== 'string' ? setCustomer(res) : setError(res);
        typeof res === 'string' ? notification('error', res) : navigate('/');
      })
      .catch((err: Error) => {
        setError(err.message);
        notification('error', err.message);
      });
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const input = e.target as HTMLInputElement;
    const { name, value } = input;

    if (input.getAttribute('data-address') === 'shipping') {
      setAddress({ ...address, [name]: value });

      return;
    }
    if (input.getAttribute('data-address') === 'billing') {
      setBillingAddress({ ...billingAddress, [name]: value });

      return;
    }
    setCustomerState({ ...customerInfo, [name]: value });
  };

  const changeBillingAddress = (): void => {
    checkTheSameAddress(!isTheSameAddress);

    if (!isTheSameAddress) {
      setDefaultAddress(0);
      setBillingAddress({ ...address });

      return;
    }
    setBillingAddress({ ...customerAddressState });
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

        <FormControlLabel
          control={<Checkbox checked={defaultShippingAddress} onChange={changeDefaultShippingAddress} />}
          label='Set as default shipping address'
        />

        <FormControlLabel
          control={<Checkbox checked={isTheSameAddress} onChange={changeBillingAddress} />}
          label='Set as billing address'
        />

        <AdressCustomerInputs address={billingAddress} data='billing' title='Billing Address' />

        <FormControlLabel
          control={<Checkbox checked={defaultBillingAddress} onChange={changeDefaultBillinggAddress} />}
          label='Set as default billing address'
        />

        <Button type='submit' variant='contained' sx={styles.formButton}>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default AuthCustomer;
