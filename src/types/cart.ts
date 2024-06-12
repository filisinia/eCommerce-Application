import { IPrice, IProduct } from './products';

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

export interface ICart {
  id: string;
  version: number;
  key: string;
  customerId: string;
  lineItems: IProduct[];
  totalPrice: IPrice;
  shippingAddress: ICartAddress;
  billingAddress: ICartAddress;
  store: IStore;
}
export interface IFetchCartSucess {
  data: ICart;
}
