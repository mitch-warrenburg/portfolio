import React, {
  FC,
  useRef,
  useMemo,
  useState,
  useCallback,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import Button from '../../atoms/Button';
import draftToHtml from 'draftjs-to-html';
import Notification from '../Notification';
import Optional from '../../atoms/Optional';
import FormField from '../../molecules/FormField';
import styled, { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { State, UserState } from '../../../store/types';
import LoadingOverlay from '../../molecules/LoadingOverlay';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState, Editor as EditorType } from 'draft-js';
import { composeNewEmail, sendEmail } from '../../../store/state/userSlice';
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
  margin-bottom: 16px;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));

  & > div {
    width: 100%;
    min-width: 190px;
    margin: 0;

    & > input {
      width: 100%;
      min-width: 190px;
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

  const editorRef = useRef<EditorType>();
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const companyFieldRef = useRef<HTMLInputElement>(null);
  const phoneNumberFieldRef = useRef<HTMLInputElement>(null);

  const focusEditor = useCallback(() => editorRef.current?.focus(), []);
  const focusEmail = useCallback(() => emailFieldRef.current?.focus(), [emailFieldRef]);
  const focusCompany = useCallback(() => companyFieldRef.current?.focus(), [companyFieldRef]);
  const focusPhoneNumber = useCallback(() => phoneNumberFieldRef.current?.focus(), [
    phoneNumberFieldRef,
  ]);

  const nameKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    ({ key }) => key === 'Enter' && focusCompany(),
    [focusCompany]
  );

  const companyKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    ({ key }) => key === 'Enter' && focusEmail(),
    [focusEmail]
  );

  const emailKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    ({ key }) => key === 'Enter' && focusPhoneNumber(),
    [focusPhoneNumber]
  );

  const phoneNumberKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    ({ key }) => key === 'Enter' && focusEditor(),
    [editorRef]
  );

  const setEditorRef = useCallback((ref: EditorType) => {
    editorRef.current = ref;
  }, []);

  const isFormValid = useMemo(() => !!(email && company && username), [
    email,
    company,
    username,
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

  const submitButtonClickHandler = useCallback(() => {
    dispatch(
      sendEmail({
        company,
        phoneNumber,
        address: email,
        name: username,
        content: editorStateToHtml(editorState),
      })
    );
  }, [email, company, username, phoneNumber, editorState]);

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
              type="text"
              label="Name"
              name="username"
              value={username}
              disabled={user.isLoading}
              onBlur={focusCompany}
              onChange={fieldChangeHandler}
              onKeyDown={nameKeyDownHandler}
            />
            <FormField
              type="text"
              name="company"
              label="Company"
              value={company}
              onBlur={focusEmail}
              disabled={user.isLoading}
              ref={companyFieldRef}
              onChange={fieldChangeHandler}
              onKeyDown={companyKeyDownHandler}
            />
            <FormField
              type="email"
              name="email"
              label="Email"
              inputMode="email"
              value={email}
              disabled={user.isLoading}
              ref={emailFieldRef}
              onBlur={focusPhoneNumber}
              onChange={fieldChangeHandler}
              onKeyDown={emailKeyDownHandler}
            />
            <FormField
              type="text"
              inputMode="tel"
              name="phoneNumber"
              label="Phone Number"
              disabled={user.isLoading}
              value={phoneNumber}
              ref={phoneNumberFieldRef}
              onChange={fieldChangeHandler}
              onBlur={focusEditor}
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
          <Button
            transparent
            onClick={submitButtonClickHandler}
            disabled={!isFormValid || user.isLoading}>
            Submit
          </Button>
        </Container>
      </Optional>
    </>
  );
};

export default EmailEditor;
