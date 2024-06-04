import EditIcon from '@mui/icons-material/Edit';
import { Box, CardActions, CardContent, IconButton, Typography } from '@mui/material';

import { ICustomerInfo } from 'types/customer';

interface IProfileInfo {
  customer: ICustomerInfo;
  onEdit: () => void;
}

const ProfileInfo = ({ customer, onEdit }: IProfileInfo): JSX.Element => {
  const { firstName, lastName, dateOfBirth } = customer;

  return (
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
        <IconButton size='large' onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </Box>
  );
};

export default ProfileInfo;
