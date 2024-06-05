export interface ICustomerAddress {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface ICustomerInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface ICustomer extends ICustomerInfo {
  addresses: ICustomerAddress[];
  shippingAddresses?: number[];
  billingAddresses?: number[];
  defaultBillingAddress?: number | null;
  defaultShippingAddress?: number | null;
}

export interface ICustomerRes extends ICustomer {
  id: string;
  version: number;
  isEmailVerified: boolean;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
}

export interface ICustomerSuccess {
  data: ICustomerRes;
}

export interface IAuthCustomerSuccess {
  data: { customer: ICustomerRes };
}

export interface IAuthCustomerError {
  response: {
    data: {
      errors: { code: string; message: string }[];
      message: string;
      statusCode: number;
    };
  };
}

export interface ICustomerLoginData {
  email: string;
  password: string;
}

export interface ICustomerLoginSuccess {
  data: ICustomerLoginSuccessData;
}

export interface ICustomerLoginSuccessData {
  access_token: string;
  refresh_token: string;
}

export interface ICustomerPasswordToken {
  value: string;
  id: string;
}
export interface ICustomerPasswordTokenRes {
  data: {
    value: string;
    id: string;
  };
}
