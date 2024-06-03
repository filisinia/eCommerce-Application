export interface IProductAttributes {
  name: string;
  value: { [key: string]: string };
}

interface IProductPrice {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  country: string;
  discounted: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discount: IProductCategory;
  };
}

export interface IProductCategory {
  typeId: string;
  id: string;
  name: { [key: string]: string };
  key: string;
}

interface IProductAvailability {
  isOnStock: boolean;
  availableQuantity: number;
  version: number;
  id: string;
}

export interface IProduct {
  id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  categories: IProductCategory[];
  categoryOrderHints: { [key: string]: string };
  masterVariant: {
    id: string;
    prices: IProductPrice[];
    attributes: IProductAttributes[];
    images: { url: string }[];
    availability: IProductAvailability;
  };
}

export interface IProducts {
  limit: number;
  total: number;
  results: IProduct[];
}

export interface IProductCategories {
  limit: number;
  total: number;
  results: IProductCategory[];
}

export interface IFetchProductSuccess {
  data: IProducts;
}
export interface IFetchProductsCategoriesSuccess {
  data: IProductCategories;
}
