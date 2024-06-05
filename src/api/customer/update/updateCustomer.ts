import axios from 'axios';

import {
  ICustomerSuccess,
  ICustomerPasswordToken,
  ICustomerPasswordTokenRes,
  ICustomerRes,
  ICustomerAddress,
} from 'types/customer';
import { catchFetchError } from 'utils/errors';

const baseUrl = `${process.env.REACT_APP_API__HOST}/${process.env.REACT_APP_API_PROJECT_KEY}`;

interface IUpdateCustomerInfo {
  id: string;
  version: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}
export const updateCustomerInfo = async (customer: IUpdateCustomerInfo): Promise<ICustomerRes | string> => {
  try {
    const { id, version, firstName, lastName, dateOfBirth, email } = customer;

    const updatedCustomer = {
      version,
      actions: [
        { action: 'setFirstName', firstName },
        { action: 'setLastName', lastName },
        { action: 'setDateOfBirth', dateOfBirth },
        { action: 'changeEmail', email },
      ],
    };

    const { data }: ICustomerSuccess = await axios.post(`${baseUrl}/customers/${id}`, JSON.stringify(updatedCustomer));

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

export const getCustomerPasswordToken = async (email: string): Promise<ICustomerPasswordToken | string> => {
  try {
    const { data }: ICustomerPasswordTokenRes = await axios.post(
      `${baseUrl}/customers/password-token`,
      JSON.stringify({ email }),
    );

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

export const updateCustomerPassword = async (
  tokenValue: string,
  newPassword: string,
): Promise<ICustomerRes | string> => {
  try {
    const { data }: ICustomerSuccess = await axios.post(
      `${baseUrl}/customers/password/reset`,
      JSON.stringify({ tokenValue, newPassword }),
    );

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

export const removeCustomerAddress = async (
  version: number,
  addressId: string,
  id: string,
): Promise<ICustomerRes | string> => {
  try {
    const req = {
      version,
      actions: [{ action: 'removeAddress', addressId }],
    };
    const { data }: ICustomerSuccess = await axios.post(`${baseUrl}/customers/${id}`, JSON.stringify(req));

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

export const addAddress = async (version: number, address: ICustomerAddress, id: string): Promise<string> => {
  try {
    const req = { version, actions: [{ action: 'addAddress', address }] };

    const { data }: ICustomerSuccess = await axios.post(`${baseUrl}/customers/${id}`, JSON.stringify(req));

    const addressID = data.addresses.pop();

    return addressID?.id ? addressID?.id : '';
  } catch (e) {
    return catchFetchError(e);
  }
};
