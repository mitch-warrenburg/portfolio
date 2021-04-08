import React, { FC, useRef, useCallback, useMemo } from 'react';
import Editor from '../Editor';
import { uniqueId } from 'lodash';
import EmailForm from '../EmailForm';
import Button from '../../atoms/Button';
import Notification from '../Notification';
import Optional from '../../atoms/Optional';
import Section from '../../molecules/Section';
import { useEventCallback } from '../../../hooks';
import styled, { useTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import useAuthState from '../../../hooks/useAuthState';
import { State, UserState } from '../../../store/types';
import { MAX_EMAIL_COUNT } from '../../../globalConstants';
import LoadingOverlay from '../../molecules/LoadingOverlay';
import { addNotification } from '../../../store/state/uiSlice';
import { ValidationTriggerCallback } from '../EmailForm/types';
import { composeNewEmail, sendEmail } from '../../../store/state/userSlice';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 0;
`;

const EmailSection: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const emailContentRef = useRef<string>('');
  const { emailCount = 0, isEmailSuccess, isLoading, uid } = useSelector<State, UserState>(
    ({ user }) => user
  );
  const validationTriggerRef = useRef<ValidationTriggerCallback>(() => null);

  const { isUserFullyAuthenticated, updateAuthStateStatus } = useAuthState();

  const newEmailClickHandler = useCallback(() => {
    dispatch(composeNewEmail({}));
  }, []);

  const shouldRenderEditor = useMemo(() => emailCount < MAX_EMAIL_COUNT && !isEmailSuccess, [
    emailCount,
    isEmailSuccess,
  ]);

  const submitButtonClickHandler = useEventCallback(() => {
    const formData = validationTriggerRef.current();

    if (formData) {
      if (!emailContentRef.current) {
        dispatch(
          addNotification({
            id: uniqueId(),
            text: 'Email content must not be blank.',
            type: 'failure',
          })
        );
        return;
      }

      !isUserFullyAuthenticated && updateAuthStateStatus();

      dispatch(
        sendEmail({
          formData,
          uid: uid,
          isUserFullyAuthenticated,
          content: emailContentRef.current,
        })
      );
    }
  });

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
        <EmailForm validationTriggerRef={validationTriggerRef} />
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
