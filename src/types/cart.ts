import { IPrice } from 'types/products';

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
  discountedPricePerQuantity: IPrice[];
  price: { id: string; discounted: { value: IPrice }; value: IPrice };
}

export interface ICart {
  id: string;
  version: number;
  key: string;
  customerId: string;
  lineItems: IProductCart[];
  totalLineItemQuantity: number;
  shippingAddress: ICartAddress;
  billingAddress: ICartAddress;
  store: IStore;
  totalPrice: IPrice;
}

export interface IFetchCartSuccess {
  data: ICart;
}

export interface IFetchCustomerCartsSuccess {
  data: {
    results: ICart[];
  };
}

export interface ICreateCartRequest {
  currency: string;
  country: string;
  customerId?: string;
  action?: 'setAnonymousId';
  anonymousId?: string;
}
export interface ICartDiscount {
  id: string;
  version: number;
  code: string;
  cartDiscounts: [{ typeId: string; id: string }];
  isActive: true;
  cartPredicate: string;
}
export interface IFetchCartDiscountSuccess {
  data: {
    limit: number;
    total: number;
    results: ICartDiscount[];
  };
}
