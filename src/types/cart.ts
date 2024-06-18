import { IPrice } from './products';

interface ICartAddress {
  firstName: string;
  lastName: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface IStore {
  typeId: string;
  key: string;
}

export interface IProductCart {
  id: string;
  productId: string;
  productKey: string;
  name: { 'en-US': string };
  totalPrice: IPrice;
  quantity: number;
  variant: {
    images: { url: string }[];
  };
}

export interface ICart {
  id: string;
  version: number;
  key: string;
  customerId: string;
  lineItems: IProductCart[];
  shippingAddress: ICartAddress;
  billingAddress: ICartAddress;
  store: IStore;
}
export interface IFetchCartSucess {
  data: ICart;
}