import axios, { isAxiosError } from 'axios';

import { ICustomerLoginData, IAuthCustomerSuccess, ICustomerRes, IAuthCustomerError } from 'types/customer';

const baseUrl = 'https://auth.europe-west1.gcp.commercetools.com';
const projectKey = 'rs-shop-2023q4';
const clientId = 'pdKV37-QDhz87157SdnJ0s2-';
const clientSecret = 'TnuUqEcIBJgiL_u8lVwEMmQ2VT1Geqb8';

const loginUser = async (user: ICustomerLoginData): Promise<ICustomerRes | string> => {
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = btoa(credentials);

  try {
    const { data }: IAuthCustomerSuccess = await axios.post(
      `${baseUrl}/oauth/${projectKey}/customers/token`,
      new URLSearchParams({
        grant_type: 'password',
        username: user.email,
        password: user.password,
      }).toString(),
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return data.customer;
  } catch (e) {
    if (isAxiosError(e)) {
      const { response } = <IAuthCustomerError>e;

      return response?.data?.message || 'An unexpected error occurred';
    }

    return 'An unexpected error occurred';
  }
};

export default loginUser;
