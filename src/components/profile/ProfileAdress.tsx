import { ICustomerAddress } from 'types/customer';

const ProfileAdress = ({ address }: { address: ICustomerAddress }): JSX.Element => {
  const { id, streetName, city, postalCode, country } = address;

  return (
    <address key={id} style={{ marginBottom: '2rem' }}>
      Place:{' '}
      <b>
        {country} ,{city}
      </b>
      <br />
      Street: <b>{streetName}</b> <br />
      Postal Code: <b>{postalCode}</b>
    </address>
  );
};

export default ProfileAdress;
