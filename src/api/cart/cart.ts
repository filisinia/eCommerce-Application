import axios from 'axios';

import setApiToken from 'api/setApiToken';
import { ICart, ICreateCartRequest, IFetchCartSuccess, IFetchCustomerCartsSuccess } from 'types/cart';
import { catchFetchError } from 'utils/errors';

const baseUrl = `${process.env.REACT_APP_API__HOST}/${process.env.REACT_APP_API_PROJECT_KEY}/carts`;

export const checkIsCartExist = async (idCustomer: string): Promise<boolean> => {
  try {
    await setApiToken();

    const { data }: IFetchCustomerCartsSuccess = await axios(`${baseUrl}?where=customerId%3D%22${idCustomer}%22`);

    return data.results.length > 0;
  } catch (e) {
    return false;
  }
};

export const createCart = async (idCustomer?: string): Promise<ICart | string> => {
  try {
    await setApiToken();

    const anonymousId = new Date().getTime();

    let req: ICreateCartRequest = {
      currency: 'EUR',
      country: 'DE',
    };

    req = idCustomer
      ? { ...req, customerId: idCustomer }
      : { ...req, action: 'setAnonymousId', anonymousId: String(anonymousId) };

    const { data }: IFetchCartSuccess = await axios.post(baseUrl, JSON.stringify(req));

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

export const fetchCart = async (
  idCustomer: string = 'e1db0d5c-2e53-49b0-88e7-2985d4d327c4',
): Promise<ICart | string> => {
  try {
    await setApiToken();
    const { data }: IFetchCustomerCartsSuccess = await axios(`${baseUrl}?where=customerId%3D%22${idCustomer}%22`);

    return data.results[data.results.length - 1] || 'There is no cart for this customer';
  } catch (e) {
    return catchFetchError(e);
  }
};

type TAddProduct = (version: number, cartId: string, productId: string, quantity: number) => Promise<ICart | string>;

export const addProduct: TAddProduct = async (version, cartId, productId, quantity = 1) => {
  try {
    await setApiToken();

    const req = {
      version,
      actions: [{ action: 'addLineItem', productId, variantId: 1, quantity }],
    };

    const { data }: IFetchCartSuccess = await axios.post(`${baseUrl}/${cartId}`, JSON.stringify(req));

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
      actions: [{ action: 'removeLineItem', lineItemId, quantity }],
    });

    const { data }: IFetchCartSuccess = await axios.post(`${baseUrl}/${cartId}`, req);

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

type TRemoveCart = (cartVersion: number, cartId: string) => Promise<ICart | string>;

export const removeCart: TRemoveCart = async (cartVersion, cartId) => {
  try {
    await setApiToken();

    const { data }: IFetchCartSuccess = await axios.delete(`${baseUrl}/${cartId}?version=${cartVersion}`);

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};
