import axios from 'axios';

import { ICustomer, IAuthCustomerSuccess, ICustomerRes, ICustomerSuccess } from 'types/customer';
import { catchFetchError } from 'utils/errors';

const baseUrl = `${process.env.REACT_APP_API__HOST}/${process.env.REACT_APP_API_PROJECT_KEY}/customers`;

export const authCustomer = async (customer: ICustomer): Promise<ICustomerRes | string> => {
  try {
    const { data }: IAuthCustomerSuccess = await axios.post(baseUrl, JSON.stringify(customer));

    return data.customer;
  } catch (e) {
    return catchFetchError(e);
  }
};

interface IAddAddress {
  version: number;
  addressId: string;
  action: string;
  customerID: string;
}

type TAddAddress = ({ version, addressId, action, customerID }: IAddAddress) => Promise<ICustomerRes | string>;

export const addShippingOrBillingcCustomerAddress: TAddAddress = async ({ version, addressId, action, customerID }) => {
  try {
    const req = {
      version,
      actions: [{ action, addressId }],
    };

    const { data }: ICustomerSuccess = await axios.post(`${baseUrl}/${customerID}`, JSON.stringify(req));

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};
