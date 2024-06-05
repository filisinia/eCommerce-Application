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
  ancestors: IProductCategory[];
  parent: {
    id: string;
    typeId: string;
  };
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
  key: string;
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

interface IMasterData {
  current: IProduct;
  hasStagedChanges: boolean;
  published: boolean;
  staged: IProduct;
}

export interface IProductInfo {
  createdAt: string;
  createdBy: {
    isPlatformClient: boolean;
  };
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
  };
  lastVariantId: number;
  masterData: IMasterData;
  productType: {
    id: string;
    typeId: string;
  };
  taxCategory: {
    id: string;
    typeId: string;
  };
  version: number;
  versionModifiedAt: string;
}

export interface IFetchProductInfo {
  data: IProductInfo;
}
