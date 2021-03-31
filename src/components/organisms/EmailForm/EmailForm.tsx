import React, {
  FC,
  useRef,
  useState,
  useCallback,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import styled from 'styled-components';
import { EmailFormProps } from './types';
import { useSelector } from 'react-redux';
import MaskedFormField from '../MaskedFormField';
import { useEventCallback } from '../../../hooks';
import FormField from '../../molecules/FormField';
import { State, UserState } from '../../../store/types';
import { notBlankValidator, emailValidator, phoneNumberValidator } from '../../../util';

const FormContainer = styled.form`
  display: grid;
  padding: 0;
  margin-bottom: 28px;
  gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));

  & > div {
    width: 100%;
    min-width: 160px;
    margin: 0;

    & > input {
      width: 100%;
    }
  }
`;

const EmailForm: FC<EmailFormProps> = ({ validationTriggerRef, ...props }) => {
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const companyFieldRef = useRef<HTMLInputElement>(null);
  const phoneNumberFieldRef = useRef<HTMLInputElement>(null);
  const user = useSelector<State, UserState>(({ user }) => user);

  const [{ email, company, username, phoneNumber }, setFormState] = useState({
    email: user.email || '',
    company: user.company || '',
    username: user.username || '',
    phoneNumber: user.phoneNumber || '',
  });

  const [
    { emailError, companyError, usernameError, phoneNumberError },
    setErrorState,
  ] = useState({
    emailError: '',
    companyError: '',
    usernameError: '',
    phoneNumberError: '',
  });

  const fieldChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: field }) => {
      setFormState(prev => ({
        ...prev,
        [field.name]: field.value,
      }));
    },
    []
  );

  const nameKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    ({ key }) => key === 'Enter' && companyFieldRef.current?.focus(),
    []
  );

  const companyKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    ({ key }) => key === 'Enter' && emailFieldRef.current?.focus(),
    []
  );

  const emailKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    ({ key }) => key === 'Enter' && phoneNumberFieldRef.current?.focus(),
    []
  );

  validationTriggerRef.current = useEventCallback(() => {
    const errorState = {
      usernameError: notBlankValidator(username),
      companyError: notBlankValidator(company),
      emailError: emailValidator(email, true),
      phoneNumberError: phoneNumberValidator(phoneNumber, false),
    };
    const isValid = !Object.values(errorState).some(error => !!error);

    setErrorState(errorState);
    return isValid ? { username, company, email, phoneNumber } : null;
  });

  return (
    <FormContainer {...props}>
      <FormField
        required
        type="text"
        label="Name"
        name="username"
        value={username}
        error={usernameError}
        disabled={user.isLoading}
        onChange={fieldChangeHandler}
        onKeyDown={nameKeyDownHandler}
      />
      <FormField
        required
        type="text"
        name="company"
        label="Company"
        value={company}
        error={companyError}
        ref={companyFieldRef}
        disabled={user.isLoading}
        onChange={fieldChangeHandler}
        onKeyDown={companyKeyDownHandler}
      />
      <FormField
        required
        type="email"
        name="email"
        label="Email"
        inputMode="email"
        value={email}
        ref={emailFieldRef}
        error={emailError}
        disabled={user.isLoading}
        onChange={fieldChangeHandler}
        onKeyDown={emailKeyDownHandler}
      />
      <MaskedFormField
        type="text"
        inputMode="tel"
        name="phoneNumber"
        label="Phone Number"
        mask="(000) 000-0000"
        value={phoneNumber}
        error={phoneNumberError}
        disabled={user.isLoading}
        ref={phoneNumberFieldRef}
        onChange={fieldChangeHandler}
      />
    </FormContainer>
  );
};

export default EmailForm;
