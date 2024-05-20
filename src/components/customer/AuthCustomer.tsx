import { useEffect, useState } from 'react';

import { Box, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdressCustomerInputs from './inputs/AdressCustomerInputs';
import CustomerInfoInputs from './inputs/CustomerInfoInputs';

import authCustomer from 'api/customer/authCustomer';
import { customerAddressState, customerState } from 'components/customer/AuthCustomerState';
import styles from 'components/customer/AuthCustomerStyle';
import authCustomerStore from 'store/slices/customer/authCustomerSlice';
import { ICustomerRes, ICustomerAddress, ICustomerInfo } from 'types/customer';
import errorNotification from 'utils/errorNotification';
import { getLimitDate } from 'utils/getLimitDate';

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

  useEffect(() => {
    if (customer) {
      navigate('/');
    }
  }, []);

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
          errorNotification(res);
        } else {
          navigate('/');
        }
      })
      .catch((err: Error) => {
        setError(err.message);
        errorNotification(err.message);
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
        <CustomerInfoInputs customer={customerInfo} dateInputMaxDate={dateInputMaxDate} />

        <Typography component='h4' variant='h6'>
          Shipping Address
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={isDefaultAddressChecked} onChange={changeDefaultAddress} />}
          label='Set as billing address'
        />
        <AdressCustomerInputs address={address} data='shipping' />

        <Typography component='h4' variant='h6'>
          Billing Address
        </Typography>

        <AdressCustomerInputs address={billingAddress} data='billing' />

        <Button type='submit'>Sign Up</Button>
      </Box>{' '}
      <Box sx={styles.logInContainer}>
        <Box sx={styles.logInSpan}>Or</Box>
        <Link to='/logIn' style={styles.linkStyle}>
          Log In
        </Link>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default AuthCustomer;
