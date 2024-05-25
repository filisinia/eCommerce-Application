import axios from 'axios';

import { IProducts } from 'types/products';
import { cathFetchError } from 'utils/errors';

const baseUrl = 'https://api.europe-west1.gcp.commercetools.com/rs-shop-2023q4';

const fetchProducts = async (limit: number): Promise<void | string> => {
  try {
    const res: IProducts = await axios(`${baseUrl}/products?limit=${limit}`);

    // console.log(res);

    console.log(res);

    return '';
  } catch (e) {
    return cathFetchError(e);
  }
};

export default fetchProducts;
