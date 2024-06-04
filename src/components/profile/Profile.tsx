import { Typography } from '@mui/material';

import EditProfileInfo from './EditProfileInfo';
import ProfileAdress from './ProfileAdress';

import customerStore from 'store/slices/customer/customerSlice';

const Profile = (): JSX.Element => {
  const { customer } = customerStore((state) => state);

  const defaultBillingAddress = customer?.addresses.find(({ id }) => id === customer.defaultBillingAddressId);
  const defaultShippinggAddress = customer?.addresses.find(({ id }) => id === customer.defaultShippingAddressId);

  return (
    <section style={{ width: '40rem', margin: '2rem auto' }}>
      {customer && <EditProfileInfo customer={customer} />}

      <article style={{ marginBottom: '2rem' }}>
        <Typography variant='h5' component='h5'>
          {customer?.firstName} {customer?.lastName}
        </Typography>
        <p>
          Date Of Birth: <b>{customer?.dateOfBirth}</b>{' '}
        </p>
      </article>

      <article>
        <h4>Addresses :</h4>
        {customer?.addresses.map((address) => <ProfileAdress key={address.id} address={address} />)}

        {defaultBillingAddress && (
          <>
            <h4> Default Billing Address: </h4>
            <ProfileAdress address={defaultBillingAddress} />
          </>
        )}

        {defaultShippinggAddress && (
          <>
            <h4> Default Shipping Address: </h4>
            <ProfileAdress address={defaultShippinggAddress} />
          </>
        )}
      </article>
    </section>
  );
};

export default Profile;
