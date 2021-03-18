import React, {
  FC,
  useMemo,
  useState,
  useCallback,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import FlexBox from '../../atoms/FlexBox';
import FormField from '../../molecules/FormField';
import { adminLogin } from '../../../store/state/userSlice';
import { State, UserState } from '../../../store/types';
import FormButton from '../../molecules/FormButton';
import Optional from '../../atoms/Optional';

const Form = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-left: 16px;
`;

const ErrorText = styled.p`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.theme.error};
`;

const AdminLoginForm: FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector<State, UserState>(({ user }) => user);
  const [{ username, password }, setFormState] = useState({
    username: '',
    password: '',
  });

  const isFormValid = useMemo(() => !!(username && password), [username, password]);

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
    dispatch(adminLogin({ username, password }));
  }, [username, password]);

  const fieldKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    ({ key }) => isFormValid && key === 'Enter' && formSubmissionHandler(),
    [formSubmissionHandler, isFormValid]
  );

  return (
    <>
      <FlexBox justify="flex-start" direction="column">
        <Form>
          <FormField
            type="text"
            name="username"
            label="Username"
            disabled={isLoading}
            onChange={fieldChangeHandler}
            onKeyDown={fieldKeyDownHandler}
          />
          <FormField
            type="password"
            name="password"
            label="Password"
            disabled={isLoading}
            onChange={fieldChangeHandler}
            onKeyDown={fieldKeyDownHandler}
          />
        </Form>
        <FormButton
          type="submit"
          transparent
          isLoading={isLoading}
          disabled={!isFormValid}
          onClick={formSubmissionHandler}>
          Login
        </FormButton>
        <Optional renderIf={error}>
          <ErrorText>Authentication failed. Please try again.</ErrorText>
        </Optional>
      </FlexBox>
    </>
  );
};

export default AdminLoginForm;
