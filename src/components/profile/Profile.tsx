import { Navigate } from 'react-router-dom';

import ProfileAdress from './ProfileInfo/ProfileAdress';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfilePassword from './ProfileInfo/ProfilePassword';

import customerStore from 'store/slices/customer/customerSlice';

const Profile = (): JSX.Element => {
  const { customer } = customerStore((state) => state);

  const defaultBillingAddress = customer?.addresses.find(({ id }) => id === customer.defaultBillingAddressId);
  const defaultShippinggAddress = customer?.addresses.find(({ id }) => id === customer.defaultShippingAddressId);

  return !customer ? (
    <Navigate to='/login' replace />
  ) : (
    <section
      style={{
        maxWidth: '40rem',
        height: '100%',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {customer && <ProfileInfo customer={customer} />}

      {customer.email && <ProfilePassword email={customer.email} />}

      <article style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h4 style={{ marginBottom: '1rem' }}>Addresses :</h4>
        {customer?.addresses.map((address) => <ProfileAdress key={address.id} address={address} title='Address' />)}

        {defaultBillingAddress && <ProfileAdress address={defaultBillingAddress} title='Default Billing Address:' />}

        {defaultShippinggAddress && (
          <ProfileAdress address={defaultShippinggAddress} title='Default Shipping Address:' />
        )}
      </article>
    </section>
  );
};

export default Profile;
