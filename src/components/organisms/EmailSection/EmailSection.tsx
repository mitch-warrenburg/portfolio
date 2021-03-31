import React, { FC, useRef, useCallback } from 'react';
import Editor from '../Editor';
import EmailForm from '../EmailForm';
import Button from '../../atoms/Button';
import Notification from '../Notification';
import Optional from '../../atoms/Optional';
import Section from '../../molecules/Section';
import { useEventCallback } from '../../../hooks';
import styled, { useTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { State, UserState } from '../../../store/types';
import LoadingOverlay from '../../molecules/LoadingOverlay';
import { ValidationTriggerCallback } from '../EmailForm/types';
import { sendEmail, composeNewEmail } from '../../../store/state/userSlice';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 0;
`;

const EmailSection: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector<State, UserState>(({ user }) => user);
  const emailContentRef = useRef<string>('');
  const validationTriggerRef = useRef<ValidationTriggerCallback>(() => null);

  const newEmailClickHandler = useCallback(() => {
    dispatch(composeNewEmail({}));
  }, []);

  const submitButtonClickHandler = useEventCallback(() => {
    const result = validationTriggerRef.current();

    if (result) {
      dispatch(
        sendEmail({
          ...result,
          address: result.email,
          name: result.username,
          content: emailContentRef.current,
        })
      );
    }
  });

  return (
    <Section header="Contact Me">
      <LoadingOverlay isLoading={user.isLoading} message="Sending..." />
      <Optional renderIf={user.isEmailSuccess}>
        <Notification
          message="Email Sent"
          themeColor={theme.colors.theme.success}
          icon={{ size: 'lg', icon: 'check-circle' }}
          button={{
            transparent: true,
            text: 'Send Another',
            onClick: newEmailClickHandler,
            disabled: user.emailCount >= 3,
          }}
        />
      </Optional>
      <Optional renderIf={!user.isEmailSuccess}>
        <EmailForm validationTriggerRef={validationTriggerRef} />
        <Editor contentRef={emailContentRef} />
        <ButtonContainer>
          <Button transparent onClick={submitButtonClickHandler} disabled={user.isLoading}>
            Submit
          </Button>
        </ButtonContainer>
      </Optional>
    </Section>
  );
};

export default EmailSection;
