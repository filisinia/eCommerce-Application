import axios from 'axios';

import setApiToken from 'api/setApiToken';
import {
  IFetchProductInfo,
  IFetchProductSuccess,
  IFetchProductsCategoriesSuccess,
  IProduct,
  IProductCategories,
  IProducts,
} from 'types/products';
import { catchFetchError } from 'utils/errors';

const baseUrl = `${process.env.REACT_APP_API__HOST}/${process.env.REACT_APP_API_PROJECT_KEY}`;
const defaultLimit = 24;

export const fetchProducts = async (categoryId: string, limit: number = defaultLimit): Promise<IProducts | string> => {
  try {
    await setApiToken(); //* Need to fix
    const { data }: IFetchProductSuccess = await axios(
      `${baseUrl}/product-projections/search?filter=categories.id%3A%22${categoryId}%22&limit=${limit}`,
    );

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

export const fetchProductsCategories = async (): Promise<string | IProductCategories> => {
  try {
    const res: IFetchProductsCategoriesSuccess = await axios(`${baseUrl}/categories`);

    return res.data;
  } catch (e) {
    return catchFetchError(e);
  }
};

export const sortProductsByType = async (
  categoryId: string,
  type: string,
  direction: string,
  limit: number = defaultLimit,
): Promise<IProducts | string> => {
  try {
    await setApiToken(); //* Need to fix

    const { data }: IFetchProductSuccess = await axios(
      `${baseUrl}/product-projections/search?filter=categories.id%3A%22${categoryId}%22&sort=${type} ${direction}&limit=${limit}`,
    );

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

export const fetchProductInfo = async (productKey: string): Promise<IProduct | string> => {
  try {
    await setApiToken();

    const response: IFetchProductInfo = await axios(`${baseUrl}/products/key=${productKey}`);
    const data: IProduct = response.data.masterData.current;

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};
