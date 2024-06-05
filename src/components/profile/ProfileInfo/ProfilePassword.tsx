import { useState } from 'react';

import { Button } from '@mui/material';

import EditModal from '../editProfile/EditModal';
import EditProfilePassword from '../editProfile/EditProfilePassword';

const ProfilePassword = ({ email }: { email: string }): JSX.Element => {
  const [isOpenEditPassword, setOpenEditPassword] = useState<boolean>(false);
  const onEditPassword = (): void => setOpenEditPassword(!isOpenEditPassword);

  return (
    <>
      <EditModal isOpen={isOpenEditPassword} onClose={onEditPassword}>
        <EditProfilePassword email={email} onClose={onEditPassword} />
      </EditModal>
      <Button type='button' onClick={onEditPassword} variant='contained' sx={{ width: '30rem', m: '1rem auto' }}>
        Change Password
      </Button>
    </>
  );
};

export default ProfilePassword;
