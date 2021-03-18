import React, {
  FC,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import Optional from '../../atoms/Optional';
import { useHistory } from 'react-router-dom';
import FormField from '../../molecules/FormField';
import FormButton from '../../molecules/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { State, UserState } from '../../../store/types';
import { adminLogin } from '../../../store/state/userSlice';

const Form = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-left: 16px;
`;

const ErrorText = styled.p`
  font-size: 12px;
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.theme.error};
`;

const AdminLoginForm: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error, isAdmin } = useSelector<State, UserState>(({ user }) => user);
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

  useLayoutEffect(() => {
    if (isAdmin) {
      history.push('/admin');
    }
  }, [isAdmin]);

  return (
    <FlexBox justify="flex-start" direction="column">
      <Form>
        <FormField
          type="text"
          name="username"
          label="Username"
          autoComplete="username"
          disabled={isLoading}
          onChange={fieldChangeHandler}
          onKeyDown={fieldKeyDownHandler}
        />
        <FormField
          type="password"
          name="password"
          label="Password"
          autoComplete="current-password"
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
        <ErrorText>Authentication failed.</ErrorText>
      </Optional>
    </FlexBox>
  );
};

export default AdminLoginForm;
