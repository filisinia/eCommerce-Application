import { useState } from 'react';

import { Modal } from '@mui/material';
import { Navigate } from 'react-router-dom';

import EditProfileInfo from './EditProfileInfo';
import ProfileAdress from './ProfileAdress';
import ProfileInfo from './ProfileInfo/ProfileInfo';

import customerStore from 'store/slices/customer/customerSlice';

const Profile = (): JSX.Element => {
  const { customer } = customerStore((state) => state);
  const [isEditInfo, setEditInfo] = useState<boolean>(false);
  const onEditProfile = (): void => setEditInfo(!isEditInfo);

  const defaultBillingAddress = customer?.addresses.find(({ id }) => id === customer.defaultBillingAddressId);
  const defaultShippinggAddress = customer?.addresses.find(({ id }) => id === customer.defaultShippingAddressId);

  return !customer ? (
    <Navigate to='/login' replace />
  ) : (
    <section style={{ maxWidth: '40rem', margin: '2rem auto' }}>
      <Modal
        open={isEditInfo}
        onClose={() => setEditInfo(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgb(255, 228, 196)',
          zIndex: '999',
        }}
      >
        <EditProfileInfo customer={customer} />
      </Modal>

      {customer && <ProfileInfo customer={customer} onEdit={onEditProfile} />}

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
