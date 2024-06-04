import { Typography } from '@mui/material';

import customerStore from 'store/slices/customer/customerSlice';

const Profile = (): JSX.Element => {
  const { customer } = customerStore((state) => state);

  return (
    <article>
      <Typography variant='h5' component='h5'>
        {customer?.firstName} {customer?.lastName}
      </Typography>
      <p>{customer?.dateOfBirth}</p>
    </article>
  );
};

export default Profile;
