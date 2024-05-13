import axios, { isAxiosError } from 'axios';

import { ICustomer, IAuthCustomerSuccess, IAuthCustomerError, ICustomerRes } from '../../types/customer';

const baseUrl = 'https://api.europe-west1.gcp.commercetools.com/rs-shop-2023q4/customers';
const token = 'hLhRreBLKlPxDjy2DjDsjPYaZjMhJ7jv';

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

const authUser = async (user: ICustomer): Promise<ICustomerRes | string> => {
  try {
    const { data }: IAuthCustomerSuccess = await axios.post(baseUrl, JSON.stringify(user));

    return data.customer;
  } catch (e) {
    if (isAxiosError(e)) {
      const { response } = <IAuthCustomerError>e;

      return response.data.message;
    }

    return 'An unexpected error occurred';
  }
};

export default authUser;
