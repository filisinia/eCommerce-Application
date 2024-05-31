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

interface IProductCategory {
  typeId: string;
  id: string;
}
interface IProductAvailability {
  isOnStock: boolean;
  availableQuantity: number;
  version: number;
  id: string;
}

export interface IProduct {
  id: string;
  productType: IProductCategory;
  masterData: {
    current: {
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
    };
  };
  key: string;
  taxCategory: IProductCategory;
}

export interface IProducts {
  limit: number;
  total: number;
  results: IProduct[];
}

export interface IFetchProductSuccess {
  data: IProducts;
}
