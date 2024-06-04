import axios, { isAxiosError } from 'axios';

import { ICustomer, IAuthCustomerSuccess, ICustomerRes } from 'types/customer';
import { IFetchError } from 'types/errors';

const baseUrl = 'https://api.europe-west1.gcp.commercetools.com/rs-shop-2023q4/customers';

const authCustomer = async (customer: ICustomer): Promise<ICustomerRes | string> => {
  try {
    const { data }: IAuthCustomerSuccess = await axios.post(baseUrl, JSON.stringify(customer));

    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      const { response } = <IFetchError>e;

      return response.data.message;
    }

    return 'An unexpected error occurred';
  }
};

export default authCustomer;
