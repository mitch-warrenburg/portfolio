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
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-left: 16px;

  input {
    min-width: 220px;
    margin-bottom: 4px;
  }
`;

const PromptContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;

  svg {
    font-size: 34px;
  }
`;

const PromptText = styled.div`
  margin-left: 20px;
  font-size: 14px;
`;

const CloseButton = styled.button`
  padding: 0;
  border: none;
  margin: -10px -10px 0 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.font.primary};
  cursor: initial;
  outline: none;

  &:hover {
    transform: scale(1.08, 1.08);
    transition: ease-in-out 200ms;
  }
`;

const ErrorText = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.theme.error};
  text-align: center;
`;

const ChatSignUpForm: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<State, UserState>(({ user }) => user);
  const { isConnecting, error } = useSelector<State, ChatState>(({ chat }) => chat);

  const [{ company, username }, setFormState] = useState({
    company: user.company,
    username: user.username,
  });

  const isFormValid = useMemo(() => !!(username && company), [username, company]);

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
          username,
        })
      );
      dispatch(connectToChatServer({}));
    }
  }, [isFormValid, company, username]);

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
      <PromptContainer>
        <Icon icon="comments" size="2x" />
        <PromptText>Please tell me a bit about yourself to get started...</PromptText>
      </PromptContainer>
      <FlexBox justify="flex-start" direction="column">
        <Form>
          <FormField
            type="text"
            label="Name"
            name="username"
            value={username}
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
      <FlexBox align="flex-end" margin="0 0 0 16px">
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
