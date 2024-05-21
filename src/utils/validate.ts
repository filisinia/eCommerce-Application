import { postcodeValidatorExistsForCountry, postcodeValidator } from 'postcode-validator';

export const textValidate = (string: string): boolean => /[A-Za-z]{1,}/.test(string);

export const textAndNumberValidate = (string: string): boolean => /[0-9A-Za-z]{1,}/.test(string);

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
