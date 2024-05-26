import axios from 'axios';

import setApiToken from 'api/setApiToken';
import { IFetchProductSuccess, IProducts } from 'types/products';
import { cathFetchError } from 'utils/errors';

const baseUrl = 'https://api.europe-west1.gcp.commercetools.com/rs-shop-2023q4';

const fetchProducts = async (limit: number): Promise<IProducts | string> => {
  try {
    await setApiToken(); //* Need to fix
    const { data }: IFetchProductSuccess = await axios(`${baseUrl}/products?limit=${limit}`);

    return data;
  } catch (e) {
    return cathFetchError(e);
  }
};

export default fetchProducts;
