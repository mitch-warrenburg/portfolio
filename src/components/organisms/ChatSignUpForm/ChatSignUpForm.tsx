import React, {
  FC,
  useMemo,
  useState,
  useCallback,
  MouseEventHandler,
  ChangeEventHandler,
} from 'react';
import Icon from '../../atoms/Icon';
import styled from 'styled-components';
import Loader from '../../atoms/Loader';
import Button from '../../atoms/Button';
import FlexBox from '../../atoms/FlexBox';
import Optional from '../../atoms/Optional';
import FormField from '../../molecules/FormField';
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

  const isValidForm = useMemo(() => !!(firstName && lastName && company), [
    firstName,
    lastName,
    company,
  ]);

  const fieldChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: field }) => {
      console.log(company);
      setFormState(prev => ({
        ...prev,
        [field.name]: field.value,
      }));
    },
    []
  );

  const submitButtonClickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (isValidForm) {
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
  }, [isValidForm, company, lastName, firstName]);

  const closeButtonClickHandler = useCallback(() => {
    dispatch(setIsChatOpen(false));
    dispatch(disconnectFromChatServer({}));
  }, []);

  return (
    <Container id="chat-signup">
      <FlexBox justify="flex-end">
        <CloseButton onClick={closeButtonClickHandler}>
          <Icon icon="times-circle" size="lg" cursor="pointer" />
        </CloseButton>
      </FlexBox>
      <FlexBox id="title" margin="30px 0">
        <Icon icon="comments" size="3x" />
        <PromptText>Please tell me a bit about yourself to get started...</PromptText>
      </FlexBox>
      <FlexBox justify="flex-start" direction="column">
        <Form id="chat-signup-form">
          <FormField
            name="firstName"
            label="First Name"
            value={firstName}
            disabled={isConnecting}
            onChange={fieldChangeHandler}
          />
          <FormField
            name="lastName"
            label="Last Name"
            value={lastName}
            disabled={isConnecting}
            onChange={fieldChangeHandler}
          />
          <FormField
            name="company"
            label="Company"
            value={company}
            disabled={isConnecting}
            onChange={fieldChangeHandler}
          />
        </Form>
      </FlexBox>
      <FlexBox align="flex-end">
        <Button
          type="submit"
          transparent
          disabled={!isValidForm || isConnecting}
          onClick={submitButtonClickHandler}>
          <Optional renderIf={isConnecting}>
            <Loader durationSeconds={1.25} />
          </Optional>
          <Optional renderIf={!isConnecting}>Submit</Optional>
        </Button>
      </FlexBox>
      <Optional renderIf={error}>
        <ErrorText>Something went wrong. Please try again...</ErrorText>
      </Optional>
    </Container>
  );
};

export default ChatSignUpForm;
