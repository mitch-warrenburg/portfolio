import { chain } from 'lodash';
import { Validator } from './types';
import { emailRegex, phoneNumberRegex } from './constants';

const _emailValidator: Validator = (email = '') => {
  return emailRegex.test(email || '') ? '' : 'Email is not valid';
};

const _phoneNumberValidator: Validator = (value?: string): string => {
  return phoneNumberRegex.test(value || '') ? '' : 'Phone number is not valid';
};

export const notBlankValidator: Validator = (value?: string): string => {
  return value ? '' : 'This field is required';
};

export const emailValidator: Validator = (email?: string, required = false): string => {
  if (required) {
    return notBlankValidator(email) || _emailValidator(email);
  }
  return email ? _emailValidator(email) : '';
};

export const phoneNumberValidator: Validator = (phone?: string, required = false): string => {
  if (required) {
    return notBlankValidator(phone) || _phoneNumberValidator(phone);
  }
  return phone ? _phoneNumberValidator(phone) : '';
};

export const validateField = (value?: string, ...validators: Array<Validator>): string => {
  return (
    chain(validators)
      .map(validator => validator(value))
      .find(error => !!error)
      .value() || ''
  );
};
