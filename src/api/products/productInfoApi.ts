import axios from 'axios';

import setApiToken from 'api/setApiToken';
import { IProduct } from 'types/products';
import { cathFetchError } from 'utils/errors';

const baseUrl = 'https://api.europe-west1.gcp.commercetools.com/rs-shop-2023q4';

const fetchProductInfo = async (productKey: string): Promise<IProduct | string> => {
  try {
    await setApiToken();
    const { data } = await axios.get<IProduct>(`${baseUrl}/products/key=${productKey}`);

    return data;
  } catch (e) {
    return cathFetchError(e);
  }
};

export default fetchProductInfo;
