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
import { useEventCallback } from '../../../hooks';
import FormField from '../../molecules/FormField';
import { State, UserState } from '../../../store/types';
import { notBlankValidator, emailValidator } from '../../../util';
import { requiredFieldErrorMsg, invalidEmailMsg } from './constants';

const FormContainer = styled.form`
  display: grid;
  padding: 0;
  margin-bottom: 28px;
  gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));

  & > div {
    width: 100%;
    min-width: 130px;
    max-width: unset;
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

  const [{ email, company, username }, setFormState] = useState({
    email: user.email || '',
    company: user.company || '',
    username: user.username || '',
  });

  const [{ emailError, companyError, usernameError }, setErrorState] = useState({
    emailError: '',
    companyError: '',
    usernameError: '',
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
      emailError: emailValidator(email, true) ? '' : invalidEmailMsg,
      companyError: notBlankValidator(company) ? '' : requiredFieldErrorMsg,
      usernameError: notBlankValidator(username) ? '' : requiredFieldErrorMsg,
    };
    const isValid = !Object.values(errorState).some(error => !!error);

    setErrorState(errorState);
    return isValid ? { username, company, email } : null;
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
    </FormContainer>
  );
};

export default EmailForm;
