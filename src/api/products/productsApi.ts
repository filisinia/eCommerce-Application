import axios from 'axios';

import setApiToken from 'api/setApiToken';
import { IFetchProductSuccess, IFetchProductsCategoriesSuccess, IProductCategories, IProducts } from 'types/products';
import { cathFetchError } from 'utils/errors';

const baseUrl = `${process.env.REACT_APP_API__HOST}/${process.env.REACT_APP_API_PROJECT_KEY}`;
const defaultLimit = 24;

export const fetchProducts = async (limit: number = defaultLimit): Promise<IProducts | string> => {
  try {
    await setApiToken(); //* Need to fix
    const { data }: IFetchProductSuccess = await axios(`${baseUrl}/product-projections?limit=${limit}`);

    return data;
  } catch (e) {
    return cathFetchError(e);
  }
};

export const fetchProductsCategories = async (limit: number = defaultLimit): Promise<string | IProductCategories> => {
  try {
    const res: IFetchProductsCategoriesSuccess = await axios(`${baseUrl}/categories?limit=${limit}`);

    return res.data;
  } catch (e) {
    return cathFetchError(e);
  }
};

export const sortProductsByType = async (
  type: string,
  direction: string,
  limit: number = defaultLimit,
): Promise<IProducts | string> => {
  try {
    await setApiToken(); //* Need to fix

    const { data }: IFetchProductSuccess = await axios(
      `${baseUrl}/product-projections/search?sort=${type} ${direction}&limit=${limit}`,
    );

    return data;
  } catch (e) {
    return cathFetchError(e);
  }
};
