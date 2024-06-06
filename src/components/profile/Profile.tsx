import { useState } from 'react';

import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';

import EditModal from './editProfile/EditModal';
import EditProfileAddress from './editProfile/EditProfileAddress';
import ProfileAdress from './ProfileInfo/ProfileAdress';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfilePassword from './ProfileInfo/ProfilePassword';

import { customerAddressState } from 'components/customer/auth/AuthCustomerState';
import customerStore from 'store/slices/customer/customerSlice';

const Profile = (): JSX.Element => {
  const { customer } = customerStore((state) => state);

  const [isAddressModalOpen, setAddressModalOpen] = useState<boolean>(false);

  const openAddressModal = (): void => setAddressModalOpen(!isAddressModalOpen);

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
        {customer?.addresses.map((address) => (
          <ProfileAdress
            key={address.id}
            address={address}
            title='Address'
            version={customer.version}
            customerID={customer.id}
          />
        ))}

        {defaultBillingAddress && (
          <ProfileAdress
            address={defaultBillingAddress}
            title='Default Billing Address:'
            version={customer.version}
            customerID={customer.id}
          />
        )}

        {defaultShippinggAddress && (
          <ProfileAdress
            address={defaultShippinggAddress}
            title='Default Shipping Address:'
            version={customer.version}
            customerID={customer.id}
          />
        )}

        <EditModal isOpen={isAddressModalOpen} onClose={openAddressModal}>
          <EditProfileAddress address={customerAddressState} onClose={openAddressModal} type='add' />
        </EditModal>

        <Button
          onClick={openAddressModal}
          variant='contained'
          sx={{ display: 'flex', justifyContent: 'space-around', maxWidth: '40rem', flexDirection: 'column' }}
        >
          Add Address
        </Button>
      </article>
    </section>
  );
};

export default Profile;
