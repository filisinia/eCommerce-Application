import { useState } from 'react';

import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import { CardContent, CardHeader, Grid, IconButton } from '@mui/material';

import EditModal from '../editProfile/EditModal';
import EditProfileAddress from '../editProfile/EditProfileAddress';

import { ICustomerAddress } from 'types/customer';

const Card = styled.div`
  height: 100%;
  transition: 1s all;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  &:hover {
    background-color: rgb(43, 40, 40);
    color: white;
    box-shadow:
      0px 5px 5px -3px rgba(43, 40, 40, 0.8),
      0px 8px 10px 1px rgba(43, 40, 40, 0.64),
      0px 3px 14px 2px rgba(43, 40, 40, 0.62);
    transform: scale(1.05);
  }
  &:hover .MuiTypography-root {
    color: rgb(255, 251, 0);
  }
  &:hover .MuiSvgIcon-root {
    fill: rgb(255, 251, 0);
  }

  &:hover span {
    color: rgb(255, 228, 196);
  }
`;

const ProfileAdress = ({ address, title }: { address: ICustomerAddress; title: string }): JSX.Element => {
  const { id, streetName, city, postalCode, country } = address;

  const [isOpenEditAddress, setOpenEditAddress] = useState<boolean>(false);
  const onEditAddress = (): void => setOpenEditAddress(!isOpenEditAddress);

  return (
    <>
      <EditModal isOpen={isOpenEditAddress} onClose={onEditAddress}>
        <EditProfileAddress address={address} onClose={onEditAddress} />
      </EditModal>

      <Grid
        component='article'
        key={id}
        style={{
          marginBottom: '2rem',
          width: '30rem',
          border: '.1rem solid rgba(43, 40, 40, 0.62)',
          borderRadius: '1rem',
        }}
      >
        <Card>
          <CardHeader
            title={title}
            subheader={`Place: ${country} ${city}`}
            action={
              <IconButton type='button' onClick={onEditAddress}>
                <EditIcon />
              </IconButton>
            }
          />

          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '0.2rem' }}>
            <span>
              Street: <b>{streetName}</b> <br />
            </span>
            <span>
              Postal Code: <b>{postalCode}</b>
            </span>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ProfileAdress;
