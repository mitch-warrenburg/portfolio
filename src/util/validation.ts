import { Validator } from './types';
import { emailRegex, phoneNumberRegex, confirmationCodeRegex } from './constants';

export const confirmationCodeValidator: Validator = (value: string = '') => {
  return confirmationCodeRegex.test(value);
};
export const phoneNumberValidator: Validator = (value: string = '') => {
  return phoneNumberRegex.test(value);
};

export const notBlankValidator: Validator = (value: string = '') => {
  return !!value;
};

export const emailValidator: Validator = (email: string = '', required = true) => {
  if (required) {
    return notBlankValidator(email) && emailRegex.test(email);
  }
  return email ? emailRegex.test(email) : true;
};
