import axios from 'axios';

import { ICustomerSuccess, ICustomerRes } from 'types/customer';
import { catchFetchError } from 'utils/errors';

const baseUrl = 'https://api.europe-west1.gcp.commercetools.com';
const projectKey = 'rs-shop-2023q4';

const fetchUserData = async (accessToken: string): Promise<ICustomerRes | string> => {
  try {
    const { data }: ICustomerSuccess = await axios.get(`${baseUrl}/${projectKey}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

export default fetchUserData;
