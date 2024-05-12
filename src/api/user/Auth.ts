import axios, { isAxiosError } from 'axios';

import { IUser, IAuthUserSuccess, IAuthUserError, ICustomer } from '../../types/user';

const baseUrl = 'https://api.europe-west1.gcp.commercetools.com/rs-shop-2023q4/customers';
const token = 'hLhRreBLKlPxDjy2DjDsjPYaZjMhJ7jv';

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

const authUser = async (user: IUser): Promise<ICustomer | string> => {
  try {
    const { data }: IAuthUserSuccess = await axios.post(baseUrl, JSON.stringify(user));

    return data.customer;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = <IAuthUserError>e;

      // eslint-disable-next-line
      return response.data.message;
    }

    return 'An unexpected error occurred';
  }
};

export default authUser;
