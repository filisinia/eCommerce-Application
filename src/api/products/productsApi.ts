import axios from 'axios';

import setApiToken from 'api/setApiToken';
import {
  IFacet,
  IFetchMinMaxPrice,
  IFetchProductInfo,
  IFetchProductSuccess,
  IFetchProductsCategoriesSuccess,
  IProduct,
  IProductCategories,
  IProducts,
} from 'types/products';
import { catchFetchError } from 'utils/errors';

const baseUrl = `${process.env.REACT_APP_API__HOST}/${process.env.REACT_APP_API_PROJECT_KEY}`;
const defaultLimit = 12;

export const fetchProducts = async (categoryId: string, page: number): Promise<IProducts | string> => {
  const offset = (page - 1) * defaultLimit;

  try {
    await setApiToken(); //* Need to fix
    const { data }: IFetchProductSuccess = await axios(
      `${baseUrl}/product-projections/search?filter=categories.id%3A%22${categoryId}%22&limit=${defaultLimit}&offset=${offset}`,
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
): Promise<IProducts | string> => {
  try {
    await setApiToken(); //* Need to fix

    const { data }: IFetchProductSuccess = await axios(
      `${baseUrl}/product-projections/search?filter=categories.id%3A%22${categoryId}%22&sort=${type} ${direction}&limit=${defaultLimit}`,
    );

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};

export const searchProductsByInput = async (
  searchText: string = 'sofa',
  limit: number = defaultLimit,
): Promise<IProducts | string> => {
  try {
    await setApiToken();

    const { data }: IFetchProductSuccess = await axios(
      `${baseUrl}/product-projections/search?fuzzy=true&limit=${limit}&text.en-US="${searchText}"`,
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

export const fetchMinMaxCategoryPrice = async (categoryId: string): Promise<IFacet | string> => {
  try {
    await setApiToken();

    const { data }: IFetchMinMaxPrice = await axios(
      `${baseUrl}/product-projections/search?filter=categories.id%3A%22${categoryId}%22&&facet=variants.price.centAmount%3Arange(0 to *)`,
    );

    const result: IFacet = data.facets['variants.price.centAmount'].ranges[0];

    return result;
  } catch (e) {
    return catchFetchError(e);
  }
};

export const fetchFilterByPrice = async (categoryId: string, min: number, max: number): Promise<IProducts | string> => {
  try {
    await setApiToken();

    const { data }: IFetchProductSuccess = await axios(
      `${baseUrl}/product-projections/search?facet=variants.price.centAmount%3Arange(${min} to ${max})`,
    );

    return data;
  } catch (e) {
    return catchFetchError(e);
  }
};
