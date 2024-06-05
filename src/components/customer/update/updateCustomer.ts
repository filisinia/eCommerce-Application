import axios from 'axios';

import { IAuthCustomerSuccess, ICustomerRes } from 'types/customer';
import { catchFetchError } from 'utils/errors';

const baseUrl = `${process.env.REACT_APP_API__HOST}/${process.env.REACT_APP_API_PROJECT_KEY}`;

interface IUpdateCustomerInfo {
  id: string;
  version: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}
export const updateCustomerInfo = async (customer: IUpdateCustomerInfo): Promise<ICustomerRes | string> => {
  try {
    const { id, version, firstName, lastName, dateOfBirth } = customer;

    const updatedCustomer = {
      version,
      actions: [
        { action: 'setFirstName', firstName },
        { action: 'setLastName', lastName },
        { action: 'setDateOfBirth', dateOfBirth },
      ],
    };

    const { data }: IAuthCustomerSuccess = await axios.post(`${baseUrl}/customers/${id}`, updatedCustomer);

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};
