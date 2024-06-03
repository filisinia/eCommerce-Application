import { postcodeValidatorExistsForCountry, postcodeValidator } from 'postcode-validator';

import { ICustomerAddress, ICustomerInfo } from 'types/customer';

export const textValidate = (string: string): boolean =>
  /^(?!\s)(?![\s\S]*\s$)[a-zA-Z\s()-]*$/.test(string) && string.length !== 0;

export const textAndNumberValidate = (string: string): boolean =>
  /^(?!\s)(?![\s\S]*\s$)[a-zA-Z0-9\s()-]*$/.test(string) && string.length !== 0;

export const passwordValidate = (password: string): boolean =>
  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(password);

export const emailValidate = (email: string): boolean => /^\s*[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}\s*$/.test(email);

export const postCodeValidate = (postCode: string, country: string): boolean =>
  postcodeValidatorExistsForCountry(country) && postcodeValidator(postCode, country);

const isValidCustomer = ({ email, password, firstName, lastName }: ICustomerInfo): boolean =>
  emailValidate(email) && passwordValidate(password) && textValidate(firstName) && textValidate(lastName);

const isValidCustomerAddress = ({ streetName, city, country, postalCode }: ICustomerAddress): boolean =>
  textAndNumberValidate(streetName) && textValidate(city) && postCodeValidate(postalCode, country);

export const validateCustomerAuth = (
  customer: ICustomerInfo,
  shippingAddress: ICustomerAddress,
  billingAddress: ICustomerAddress,
): boolean =>
  isValidCustomer(customer) && isValidCustomerAddress(shippingAddress) && isValidCustomerAddress(billingAddress);
