import React, {
  FC,
  useRef,
  useMemo,
  useEffect,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import chroma from 'chroma-js';
import Icon from '../../atoms/Icon';
import IconButton from '../../atoms/IconButton';
import MaskedFormField from '../MaskedFormField';
import { useEventCallback } from '../../../hooks';
import FormField from '../../molecules/FormField';
import FormButton from '../../molecules/FormButton';
import styled, { useTheme } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { authFormAnimationDurationMs } from './constants';
import { State, UserState, UiState } from '../../../store/types';
import { MaskChangeEventHandler } from '../MaskedFormField/types';
import { AuthFormFieldsProps, AutoFocusFields, AuthFormProps } from './types';
import { advanceToNextAuthFormState, setAuthFormDraft } from '../../../store/state/userSlice';
import {
  notBlankValidator,
  phoneNumberValidator,
  confirmationCodeValidator,
} from '../../../util';
import './styles.scss';

const Container = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-height: 520px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  background: rgba(16, 18, 27, 0.6);
  border-radius: 14px;
  transition: ease-in-out 200ms;

  @media screen and (max-width: 780px), screen and (max-height: 600px) {
    max-height: none;
    border: none;
    border-radius: 0;
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  height: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    min-width: 220px;
    margin-bottom: 4px;
  }
`;

const PromptContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 70px 30px 0 30px;

  svg {
    font-size: 42px;
  }
`;

const PromptText = styled.div`
  margin-left: 20px;
  font-size: 15px;
  line-height: 1.2;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  padding: 4px;
  margin: -10px -10px 0 0;
  background: transparent;
  pointer-events: all;

  button {
    z-index: 5;
  }

  svg {
    color: ${({ theme }) => theme.colors.font.header};
  }
`;

const FormButtonContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
`;

const PhoneNumberInputWrapper = styled.div`
  position: relative;

  > span {
    position: absolute;
    top: 8px;
    left: -24px;
    font-size: 20px;
    letter-spacing: 2px;
  }
`;

const AuthFormFields: FC<AuthFormFieldsProps> = ({
  icon,
  prompt,
  children,
  authFormStatus,
  currentAuthFormState,
  ...props
}) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      classNames="auth-form"
      timeout={authFormAnimationDurationMs}
      in={authFormStatus === currentAuthFormState}>
      <FormContainer>
        <Content {...props} className="auth-form">
          <PromptContainer>
            <Icon {...icon} />
            <PromptText>{prompt}</PromptText>
          </PromptContainer>
          <Form>{children}</Form>
        </Content>
      </FormContainer>
    </CSSTransition>
  );
};

AuthFormFields.defaultProps = {
  children: null,
  authFormStatus: 'phoneNumber',
  currentAuthFormState: 'phoneNumber',
};

const AuthForm: FC<AuthFormProps> = ({ formMessages, onClickClose, ...props }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { authFormStatus } = useSelector<State, UiState>(({ ui }) => ui);
  const { authFormDraft, isLoading } = useSelector<State, UserState>(({ user }) => user);

  const {
    company = '',
    username = '',
    phoneNumber = '',
    confirmationCode = '',
  } = authFormDraft;

  const autoFocusFields: AutoFocusFields = {
    phoneNumber: useRef<HTMLInputElement>(null),
    userInfo: useRef<HTMLInputElement>(null),
    confirmationCode: useRef<HTMLInputElement>(null),
  };

  const isFormValid = useMemo(() => {
    switch (authFormStatus) {
      case 'phoneNumber':
        return phoneNumberValidator(phoneNumber);
      case 'confirmationCode':
        return confirmationCodeValidator(confirmationCode);
      case 'userInfo':
        return notBlankValidator(username) && notBlankValidator(company);
      default:
        return false;
    }
  }, [authFormStatus, phoneNumber, confirmationCode, company, username]);

  const fieldChangeHandler: ChangeEventHandler<HTMLInputElement> = useEventCallback(
    ({ target: field }) =>
      dispatch(
        setAuthFormDraft({
          ...authFormDraft,
          [field.name]: field.value,
        })
      )
  );

  const maskedFieldChangeHandler: MaskChangeEventHandler = useEventCallback(
    ({ value, name = '' }) => dispatch(setAuthFormDraft({ ...authFormDraft, [name]: value }))
  );

  const submitButtonClickHandler = useEventCallback(() => {
    if (isFormValid) {
      dispatch(advanceToNextAuthFormState({}));
      window.scrollTo(0, 0);
    }
  });

  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = useEventCallback(event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitButtonClickHandler();
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      autoFocusFields[authFormStatus]?.current?.focus();
    }, authFormAnimationDurationMs);

    return () => clearTimeout(timer);
  }, [authFormStatus]);

  return (
    <Container {...props}>
      <CloseButtonContainer>
        <IconButton icon="times-circle" size="2x" onClick={onClickClose} />
      </CloseButtonContainer>
      <AuthFormFields
        prompt={formMessages.phoneNumber}
        icon={{
          icon: 'mobile-alt',
          color: chroma('#00adb5').css(),
        }}
        authFormStatus="phoneNumber"
        currentAuthFormState={authFormStatus}>
        <PhoneNumberInputWrapper>
          <span>+1</span>
          <MaskedFormField
            label=""
            ref={autoFocusFields.phoneNumber}
            value={phoneNumber}
            name="phoneNumber"
            placeholder="Enter your phone number..."
            mask="(000) 000-0000"
            disabled={isLoading}
            onKeyDown={keyDownHandler}
            onChange={fieldChangeHandler}
            onMask={maskedFieldChangeHandler}
          />
        </PhoneNumberInputWrapper>
      </AuthFormFields>
      <AuthFormFields
        icon={{
          icon: 'sms',
          color: theme.colors.theme.success,
          style: { alignSelf: 'flex-start' },
        }}
        prompt={formMessages.confirmationCode}
        authFormStatus="confirmationCode"
        currentAuthFormState={authFormStatus}>
        <MaskedFormField
          label=""
          mask="000000"
          inputMode="tel"
          name="confirmationCode"
          value={confirmationCode}
          placeholder="Enter confirmation the code"
          disabled={isLoading}
          onKeyDown={keyDownHandler}
          onChange={fieldChangeHandler}
          onMask={maskedFieldChangeHandler}
          ref={autoFocusFields.confirmationCode}
        />
      </AuthFormFields>
      <AuthFormFields
        authFormStatus="userInfo"
        currentAuthFormState={authFormStatus}
        icon={{ icon: 'address-card', color: '#e2703a' }}
        prompt={formMessages.userInfo}>
        <FormField
          value={username}
          name="username"
          label="Name"
          onKeyDown={keyDownHandler}
          disabled={isLoading}
          ref={autoFocusFields.userInfo}
          onChange={fieldChangeHandler}
        />
        <FormField
          value={company}
          name="company"
          label="Company"
          onKeyDown={keyDownHandler}
          disabled={isLoading}
          onChange={fieldChangeHandler}
        />
      </AuthFormFields>
      <FormButtonContainer>
        <FormButton
          type="submit"
          transparent
          id="recaptcha-button"
          disabled={!isFormValid}
          isLoading={isLoading}
          onClick={submitButtonClickHandler}>
          Submit
        </FormButton>
      </FormButtonContainer>
    </Container>
  );
};

export default AuthForm;
