import axios from 'axios';

import setApiToken from 'api/setApiToken';
import { ICart, IFetchCartSucess } from 'types/cart';
import { catchFetchError } from 'utils/errors';

const baseUrl = `${process.env.REACT_APP_API__HOST}/${process.env.REACT_APP_API_PROJECT_KEY}/carts`;

export const fetchCart = async (id: string = '058d0873-ace1-4f22-9249-2fc04fcc643d'): Promise<ICart | string> => {
  try {
    await setApiToken();
    const { data }: IFetchCartSucess = await axios(`${baseUrl}/${id}`);

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

type TAddProduct = (version: number, cartId: string, productId: string, quantity: number) => Promise<ICart | string>;

export const addProduct: TAddProduct = async (version, cartId, productId, quantity = 1) => {
  try {
    await setApiToken();

    const req = JSON.stringify({
      version,
      actions: [
        {
          action: 'addLineItem',
          productId,
          variantId: 1,
          quantity,
        },
      ],
    });

    const { data }: IFetchCartSucess = await axios.post(`${baseUrl}/${cartId}`, req);

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

type TRemoveProduct = (
  version: number,
  cartId: string,
  lineItemId: string,
  quantity: number,
) => Promise<ICart | string>;

export const removeProduct: TRemoveProduct = async (version, cartId, lineItemId, quantity = 1) => {
  try {
    await setApiToken();

    const req = JSON.stringify({
      version,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId,
          quantity,
        },
      ],
    });

    const { data }: IFetchCartSucess = await axios.post(`${baseUrl}/${cartId}`, req);

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

type TRemoveCart = (cartVersion: number, cartId: string) => Promise<ICart | string>;

export const removeCart: TRemoveCart = async (cartVersion, cartId): Promise<ICart | string> => {
  try {
    await setApiToken();

    const { data }: IFetchCartSucess = await axios.delete(`${baseUrl}/${cartId}?version=${cartVersion}`);

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};
