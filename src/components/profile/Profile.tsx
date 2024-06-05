import { useState } from 'react';

import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';

import EditModal from './editProfile/EditModal';
import EditProfileInfo from './editProfile/EditProfileInfo';
import EditProfilePassword from './editProfile/EditProfilePassword';
import ProfileAdress from './ProfileAdress';
import ProfileInfo from './ProfileInfo/ProfileInfo';

import customerStore from 'store/slices/customer/customerSlice';

const Profile = (): JSX.Element => {
  const { customer } = customerStore((state) => state);
  const [isOpenEditInfo, setOpenEditInfo] = useState<boolean>(false);
  const onEditProfile = (): void => setOpenEditInfo(!isOpenEditInfo);

  const [isOpenEditPassword, setOpenEditPassword] = useState<boolean>(false);
  const onEditPassword = (): void => setOpenEditPassword(!isOpenEditPassword);

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
      {customer && <ProfileInfo customer={customer} onEdit={onEditProfile} />}
      <EditModal isOpen={isOpenEditInfo} onClose={onEditProfile}>
        <EditProfileInfo customer={customer} onClose={onEditProfile} />
      </EditModal>

      <Button type='button' onClick={onEditPassword}>
        Change Password
      </Button>

      <EditModal isOpen={isOpenEditPassword} onClose={onEditPassword}>
        <EditProfilePassword email={customer.email} onClose={onEditPassword} />
      </EditModal>

      <article style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h4 style={{ marginBottom: '1rem' }}>Addresses :</h4>
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
