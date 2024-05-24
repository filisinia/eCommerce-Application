import { postcodeValidatorExistsForCountry, postcodeValidator } from 'postcode-validator';

import { ICustomerAddress, ICustomerInfo } from 'types/customer';

export const textValidate = (string: string): boolean =>
  /^(?!\s)(?![\s\S]*\s$)[a-zA-Z\s()-]*$/.test(string) && string.length !== 0;

export const textAndNumberValidate = (string: string): boolean =>
  /^(?!\s)(?![\s\S]*\s$)[a-zA-Z0-9\s()-]*$/.test(string) && string.length !== 0;

export const passwordValidate = (password: string): boolean =>
  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(password);

export const emailValidate = (email: string): boolean => /^\s*[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}\s*$/.test(email);

export const postCodeValidate = (postCode: string, country: string): boolean => {
  let isValid = false;

  if (postcodeValidatorExistsForCountry(country)) {
    if (postcodeValidator(postCode, country)) isValid = true;
  }

  return isValid;
};

const isValidCustomer = (customer: ICustomerInfo): boolean => {
  const { email, password, firstName, lastName } = customer;

  return emailValidate(email) && passwordValidate(password) && textValidate(firstName) && textValidate(lastName);
};

const isValidCustomerAddress = (address: ICustomerAddress): boolean => {
  const { streetName, city, country, postalCode } = address;

  return textAndNumberValidate(streetName) && textValidate(city) && postCodeValidate(postalCode, country);
};

export const validateCustomerAuth = (
  customer: ICustomerInfo,
  shippingAddress: ICustomerAddress,
  billingAddress: ICustomerAddress,
): boolean =>
  isValidCustomer(customer) && isValidCustomerAddress(shippingAddress) && isValidCustomerAddress(billingAddress);
