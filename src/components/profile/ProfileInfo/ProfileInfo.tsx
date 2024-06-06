import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, CardActions, CardContent, IconButton, Typography } from '@mui/material';

import EditModal from '../editProfile/EditModal';
import EditProfileInfo from '../editProfile/EditProfileInfo';

import { ICustomerRes } from 'types/customer';

interface IProfileInfo {
  customer: ICustomerRes;
}

const ProfileInfo = ({ customer }: IProfileInfo): JSX.Element => {
  const { firstName, lastName, dateOfBirth } = customer;

  const [isOpenEditInfo, setOpenEditInfo] = useState<boolean>(false);

  const onEditProfile = (): void => setOpenEditInfo(!isOpenEditInfo);

  return (
    <>
      <EditModal isOpen={isOpenEditInfo} onClose={onEditProfile}>
        <EditProfileInfo customer={customer} onClose={onEditProfile} />
      </EditModal>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <CardContent>
          <Typography color='text.secondary' variant='h4'>
            {firstName} {lastName}
          </Typography>
          <Typography variant='h5' color='text.secondary' sx={{ fontSize: 14 }}>
            Date Of Birth: <b>{dateOfBirth}</b>{' '}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size='large' onClick={onEditProfile}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Box>
    </>
  );
};

export default ProfileInfo;
