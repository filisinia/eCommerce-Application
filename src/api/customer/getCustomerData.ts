import axios, { isAxiosError } from 'axios';

import { IAuthCustomerError, ICustomerRes } from 'types/customer';

const baseUrl = 'https://api.europe-west1.gcp.commercetools.com';
const projectKey = 'rs-shop-2023q4';
// const passwordTokenEndpoint = `/customers/password-token={${password - token}}`;

const fetchUserData = async (accessToken: string): Promise<ICustomerRes | string> => {
  try {
    const res: ICustomerRes = await axios.get(`${baseUrl}/${projectKey}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return res;
  } catch (e) {
    if (isAxiosError(e)) {
      const { response } = <IAuthCustomerError>e;

      return response?.data?.message || 'An unexpected error occurred';
    }

    return 'An unexpected error occurred';
  }
};

export default fetchUserData;
