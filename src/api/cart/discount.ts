import axios from 'axios';

import setApiToken from 'api/setApiToken';
import { ICartDiscount, IFetchCartDiscountSuccess } from 'types/cart';
import { catchFetchError } from 'utils/errors';

const baseUrl = `${process.env.REACT_APP_API__HOST}/${process.env.REACT_APP_API_PROJECT_KEY}/discount-codes`;

export const fetchDiscountCodes = async (): Promise<ICartDiscount[] | string> => {
  try {
    await setApiToken();

    const { data }: IFetchCartDiscountSuccess = await axios(baseUrl);

    return data.results;
  } catch (e) {
    return catchFetchError(e);
  }
};
