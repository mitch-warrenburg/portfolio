import React, { FC, useRef, useCallback, useMemo, useState, useEffect } from 'react';
import Editor from '../Editor';
import { uniqueId } from 'lodash';
import Button from '../../atoms/Button';
import Notification from '../Notification';
import Optional from '../../atoms/Optional';
import Section from '../../molecules/Section';
import { emailValidator } from '../../../util';
import { useEventCallback } from '../../../hooks';
import FormField from '../../molecules/FormField';
import styled, { useTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import useAuthState from '../../../hooks/useAuthState';
import { State, UserState } from '../../../store/types';
import { MAX_EMAIL_COUNT } from '../../../globalConstants';
import LoadingOverlay from '../../molecules/LoadingOverlay';
import { composeNewEmail, sendEmail } from '../../../store/state/userSlice';
import { addNotification, setIsAuthFormModalOpen } from '../../../store/state/uiSlice';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 0;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 10px;

  > div {
    width: 100%;
    max-width: 300px;
  }
`;

const EmailSection: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const emailContentRef = useRef<string>('');
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState(false);
  const [isPendingAuth, setIsPendingAuth] = useState(false);
  const { isUserFullyAuthenticated, updateAuthStateStatus } = useAuthState();
  const {
    uid,
    isLoading,
    emailCount = 0,
    isEmailSuccess,
    email: currentEmail = '',
  } = useSelector<State, UserState>(({ user }) => user);

  const newEmailClickHandler = useCallback(() => {
    dispatch(composeNewEmail({}));
  }, []);

  const shouldRenderEditor = useMemo(() => emailCount < MAX_EMAIL_COUNT && !isEmailSuccess, [
    emailCount,
    isEmailSuccess,
  ]);

  const submitButtonClickHandler = useEventCallback(() => {
    const email = emailInputRef.current?.value;
    const { current: content } = emailContentRef;
    const isEmailValid = emailValidator(email, true);

    if (isEmailValid) {
      setEmailError(false);

      if (!content) {
        dispatch(
          addNotification({
            id: uniqueId(),
            type: 'failure',
            text: 'Email content must not be blank.',
          })
        );
      } else if (!isUserFullyAuthenticated) {
        setIsPendingAuth(true);
        updateAuthStateStatus();
        dispatch(setIsAuthFormModalOpen(true));
      } else {
        dispatch(sendEmail({ uid, email, content }));
      }
    } else {
      setEmailError(true);
    }
  });

  useEffect(() => {
    if (isUserFullyAuthenticated) {
      dispatch(setIsAuthFormModalOpen(false));
    }
  }, [isUserFullyAuthenticated]);

  useEffect(() => {
    if (isUserFullyAuthenticated && isPendingAuth) {
      const email = emailInputRef.current?.value;
      const { current: content } = emailContentRef;

      setIsPendingAuth(false);
      dispatch(sendEmail({ uid, email, content }));
    }
  }, [uid, isUserFullyAuthenticated]);

  return (
    <Section header="Contact Me">
      <LoadingOverlay isLoading={isLoading} message="Sending..." />
      <Optional renderIf={!shouldRenderEditor}>
        <Notification
          message="Email Sent"
          themeColor={theme.colors.theme.success}
          icon={{ size: 'lg', icon: 'check-circle' }}
          button={{
            transparent: true,
            text: 'Send Another',
            onClick: newEmailClickHandler,
            disabled: emailCount >= MAX_EMAIL_COUNT,
          }}
        />
      </Optional>
      <Optional renderIf={shouldRenderEditor}>
        <FormContainer>
          <FormField
            required
            type="email"
            name="email"
            inputMode="email"
            label="Your Email"
            ref={emailInputRef}
            disabled={isLoading}
            defaultValue={currentEmail}
            error={emailError ? 'A valid email is required' : ''}
          />
        </FormContainer>
        <Editor contentRef={emailContentRef} />
        <ButtonContainer>
          <Button transparent onClick={submitButtonClickHandler} disabled={isLoading}>
            Submit
          </Button>
        </ButtonContainer>
      </Optional>
    </Section>
  );
};

export default EmailSection;
