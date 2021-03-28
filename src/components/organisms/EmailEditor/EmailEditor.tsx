import React, {
  FC,
  useRef,
  useState,
  useCallback,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import Button from '../../atoms/Button';
import draftToHtml from 'draftjs-to-html';
import Notification from '../Notification';
import Optional from '../../atoms/Optional';
import MaskedFormField from '../MaskedFormField';
import FormField from '../../molecules/FormField';
import { useEventCallback } from '../../../hooks';
import styled, { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { State, UserState } from '../../../store/types';
import LoadingOverlay from '../../molecules/LoadingOverlay';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState, Editor as EditorType } from 'draft-js';
import { composeNewEmail, sendEmail } from '../../../store/state/userSlice';
import { emailValidator, notBlankValidator, phoneNumberValidator } from '../../../util';
import './styles.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const uploadImageCallBack = async () => {};

const editorStateToHtml = (editorState: EditorState): string => {
  return draftToHtml(convertToRaw(editorState.getCurrentContent()));
};

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  padding: 0;

  & input {
    width: 100%;
    max-width: 100%;
  }
`;

const FormContainer = styled.div`
  display: grid;
  padding: 0;
  margin-bottom: 28px;
  grid-gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));

  & > div {
    width: 100%;
    min-width: 160px;
    margin: 0;

    & > input {
      width: 100%;
      min-width: 160px;
    }
  }
`;

const EmailEditor: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector<State, UserState>(({ user }) => user);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [{ email, company, username, phoneNumber }, setFormState] = useState({
    email: user.email || '',
    company: user.company || '',
    username: user.username || '',
    phoneNumber: user.phoneNumber || '',
  });
  const [
    { emailError, companyError, usernameError, phoneNumberError },
    setErrorState,
  ] = useState({
    emailError: '',
    companyError: '',
    usernameError: '',
    phoneNumberError: '',
  });

  const editorRef = useRef<EditorType>();
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const companyFieldRef = useRef<HTMLInputElement>(null);
  const phoneNumberFieldRef = useRef<HTMLInputElement>(null);

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

  const phoneNumberKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        editorRef.current?.focus();
      }
    },
    []
  );

  const setEditorRef = useCallback((ref: EditorType) => {
    editorRef.current = ref;
  }, []);

  const fieldChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: field }) => {
      setFormState(prev => ({
        ...prev,
        [field.name]: field.value,
      }));
    },
    []
  );

  const submitButtonClickHandler = useEventCallback(() => {
    const errorState = {
      usernameError: notBlankValidator(username),
      companyError: notBlankValidator(company),
      emailError: emailValidator(email, true),
      phoneNumberError: phoneNumberValidator(phoneNumber, false),
    };

    const isValid = !Object.values(errorState).some(error => !!error);

    setErrorState(errorState);

    isValid &&
      dispatch(
        sendEmail({
          company,
          phoneNumber,
          address: email,
          name: username,
          content: editorStateToHtml(editorState),
        })
      );
  });

  const newEmailClickHandler = useCallback(() => {
    dispatch(composeNewEmail({}));
  }, []);

  return (
    <>
      <LoadingOverlay isLoading={user.isLoading} message="Sending..." />
      <Optional renderIf={user.isEmailSuccess}>
        <Notification
          themeColor={theme.colors.theme.success}
          button={{
            transparent: true,
            text: 'Send Another',
            onClick: newEmailClickHandler,
            disabled: user.emailCount >= 3,
          }}
          icon={{
            size: 'lg',
            icon: 'check-circle',
          }}
          message="Email Sent"
        />
      </Optional>
      <Optional renderIf={!user.isEmailSuccess}>
        <Container>
          <FormContainer>
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
            <MaskedFormField
              type="text"
              inputMode="tel"
              name="phoneNumber"
              label="Phone Number"
              mask="(000) 000-0000"
              value={phoneNumber}
              error={phoneNumberError}
              disabled={user.isLoading}
              ref={phoneNumberFieldRef}
              onChange={fieldChangeHandler}
              onKeyDown={phoneNumberKeyDownHandler}
            />
          </FormContainer>
          <DraftEditor
            spellCheck
            editorRef={setEditorRef}
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="email-editor"
            editorClassName="email-editor__textarea"
            placeholder="Write a message..."
            toolbar={{
              image: {
                previewImage: true,
                uploadEnabled: true,
                uploadCallback: uploadImageCallBack,
                alt: { present: true, mandatory: false },
                inputAccept:
                  'image/gif,image/jpeg,image/jpg,image/png,image/svg,application/*',
              },
              inline: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ['bold', 'italic', 'underline', 'strikethrough'],
              },
              options: [
                'image',
                'inline',
                'fontSize',
                'fontFamily',
                'list',
                'textAlign',
                'colorPicker',
                'emoji',
                'history',
              ],
            }}
          />
          <Button transparent onClick={submitButtonClickHandler} disabled={user.isLoading}>
            Submit
          </Button>
        </Container>
      </Optional>
    </>
  );
};

export default EmailEditor;
