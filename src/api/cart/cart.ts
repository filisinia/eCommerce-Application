import axios from 'axios';

import setApiToken from 'api/setApiToken';
import { ICart, IFetchCartSuccess } from 'types/cart';
import { catchFetchError } from 'utils/errors';

const baseUrl = `${process.env.REACT_APP_API__HOST}/${process.env.REACT_APP_API_PROJECT_KEY}/carts`;

export const createCart = async (idCustomer: string = ''): Promise<ICart | string> => {
  try {
    await setApiToken();

    const req = JSON.stringify({
      currency: 'EUR',
      country: 'DE',
      customerId: idCustomer,
    });

    const { data }: IFetchCartSuccess = await axios.post(baseUrl, req);

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

export const fetchCart = async (id: string = 'e1db0d5c-2e53-49b0-88e7-2985d4d327c4'): Promise<ICart | string> => {
  try {
    await setApiToken();
    const { data }: IFetchCartSuccess = await axios(`${baseUrl}/${id}`);

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

    const { data }: IFetchCartSuccess = await axios.post(`${baseUrl}/${cartId}`, req);

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

    const { data }: IFetchCartSuccess = await axios.post(`${baseUrl}/${cartId}`, req);

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

type TRemoveCart = (cartVersion: number, cartId: string) => Promise<ICart | string>;

export const removeCart: TRemoveCart = async (cartVersion, cartId): Promise<ICart | string> => {
  try {
    await setApiToken();

    const { data }: IFetchCartSuccess = await axios.delete(`${baseUrl}/${cartId}?version=${cartVersion}`);

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};
