export interface IUserAdress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface IUserInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dayOfBirth: string;
}

export interface IUser extends IUserInfo {
  addresses: IUserAdress[];
}

export interface ICustomer extends IUser {
  id: string;
  isEmailVerified: boolean;
  shippingAddressIds: [];
  billingAddressIds: [];
}

export interface IAuthUserSuccess {
  data: {
    customer: ICustomer;
  };
}

export interface IAuthUserError {
  response: {
    data: {
      errors: { code: string; message: string }[];
      message: string;
      statusCode: number;
    };
  };
}
