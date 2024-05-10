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

export interface IAuthUser extends IUserAdress, IUserInfo {}
