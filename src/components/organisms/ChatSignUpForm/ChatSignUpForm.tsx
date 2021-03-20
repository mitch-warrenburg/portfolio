import React, {
  FC,
  useMemo,
  useState,
  useCallback,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import Icon from '../../atoms/Icon';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import Optional from '../../atoms/Optional';
import FormField from '../../molecules/FormField';
import FormButton from '../../molecules/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { setIsChatOpen } from '../../../store/state/uiSlice';
import { submitChatForm } from '../../../store/state/userSlice';
import { State, ChatState, UserState } from '../../../store/types';
import { connectToChatServer, disconnectFromChatServer } from '../../../store/state/chatSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin-left: 16px;
`;

const PromptText = styled.div`
  font-size: 14px;
  margin-left: 20px;
`;

const CloseButton = styled.button`
  margin: -10px -10px 0 0;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  cursor: initial;
  color: ${({ theme }) => theme.colors.font.primary};

  &:hover {
    transition: ease-in-out 200ms;
    transform: scale(1.08, 1.08);
  }
`;

const ErrorText = styled.p`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.theme.error};
`;

const ChatSignUpForm: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<State, UserState>(({ user }) => user);
  const { isConnecting, error } = useSelector<State, ChatState>(({ chat }) => chat);

  const [{ company, lastName, firstName }, setFormState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    company: user.company,
  });

  const isFormValid = useMemo(() => !!(firstName && lastName && company), [
    firstName,
    lastName,
    company,
  ]);

  const fieldChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: field }) => {
      setFormState(prev => ({
        ...prev,
        [field.name]: field.value,
      }));
    },
    []
  );

  const formSubmissionHandler = useCallback(() => {
    if (isFormValid) {
      dispatch(
        submitChatForm({
          company,
          lastName,
          firstName,
          username: `${firstName} ${lastName}`,
        })
      );
      dispatch(connectToChatServer({}));
    }
  }, [isFormValid, company, lastName, firstName]);

  const fieldKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    ({ key }) => isFormValid && key === 'Enter' && formSubmissionHandler(),
    [formSubmissionHandler, isFormValid]
  );

  const closeButtonClickHandler = useCallback(() => {
    dispatch(setIsChatOpen(false));
    dispatch(disconnectFromChatServer({}));
  }, []);

  return (
    <Container>
      <FlexBox justify="flex-end">
        <CloseButton onClick={closeButtonClickHandler}>
          <Icon icon="times-circle" size="lg" cursor="pointer" />
        </CloseButton>
      </FlexBox>
      <FlexBox margin="30px 0">
        <Icon icon="comments" size="3x" />
        <PromptText>Please tell me a bit about yourself to get started...</PromptText>
      </FlexBox>
      <FlexBox justify="flex-start" direction="column">
        <Form>
          <FormField
            type="text"
            name="firstName"
            label="First Name"
            value={firstName}
            disabled={isConnecting}
            onChange={fieldChangeHandler}
            onKeyDown={fieldKeyDownHandler}
          />
          <FormField
            type="text"
            name="lastName"
            label="Last Name"
            value={lastName}
            disabled={isConnecting}
            onChange={fieldChangeHandler}
            onKeyDown={fieldKeyDownHandler}
          />
          <FormField
            type="text"
            name="company"
            label="Company"
            value={company}
            disabled={isConnecting}
            onChange={fieldChangeHandler}
            onKeyDown={fieldKeyDownHandler}
          />
        </Form>
      </FlexBox>
      <FlexBox align="flex-end">
        <FormButton
          type="submit"
          transparent
          isLoading={isConnecting}
          onClick={formSubmissionHandler}
          disabled={!isFormValid || isConnecting}>
          Start Chat
        </FormButton>
      </FlexBox>
      <Optional renderIf={error}>
        <ErrorText>Something went wrong. Please try again...</ErrorText>
      </Optional>
    </Container>
  );
};

export default ChatSignUpForm;
