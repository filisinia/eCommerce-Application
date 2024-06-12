import axios from 'axios';

import setApiToken from 'api/setApiToken';
import { ICart, IFetchCartSucess } from 'types/cart';
import { catchFetchError } from 'utils/errors';

const baseUrl = `${process.env.REACT_APP_API__HOST}/${process.env.REACT_APP_API_PROJECT_KEY}/carts`;

export const fetchCart = async (id: string = '5bfb135a-339c-4a69-973b-c658a4127065'): Promise<ICart | string> => {
  try {
    await setApiToken();
    const { data }: IFetchCartSucess = await axios(`${baseUrl}/${id}`);

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};
