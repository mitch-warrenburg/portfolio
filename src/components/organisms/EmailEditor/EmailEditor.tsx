import React, { FC, useState, useCallback, ChangeEventHandler, useMemo } from 'react';
import Button from '../../atoms/Button';
import draftToHtml from 'draftjs-to-html';
import FlexBox from '../../atoms/FlexBox';
import FormField from '../../molecules/FormField';
import { convertToRaw, EditorState } from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import { State, UserState } from '../../../store/types';
import { sendEmail } from '../../../store/state/userSlice';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import LoadingOverlay from '../../molecules/LoadingOverlay';
import './styles.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

const uploadImageCallBack = async () => {};

const editorStateToHtml = (editorState: EditorState): string => {
  return draftToHtml(convertToRaw(editorState.getCurrentContent()));
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const EmailEditor: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<State, UserState>(({ user }) => user);
  const [textAreaTouched, setTextAreaTouched] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [{ email, company, username, phoneNumber }, setFormState] = useState({
    email: user.email || '',
    company: user.company || '',
    username: user.username || '',
    phoneNumber: user.phoneNumber || '',
  });

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

  const textAreaFocusHandler = useCallback(() => {
    setTextAreaTouched(true);
  }, []);

  return (
    <>
      <LoadingOverlay isLoading={user.isLoading} message="Sending..." />
      <Container>
        <FlexBox justify="flex-start" wrap="wrap">
          <FormField
            type="text"
            label="Name"
            name="username"
            value={username}
            disabled={user.isLoading}
            onChange={fieldChangeHandler}
          />
          <FormField
            type="email"
            label="Email"
            name="email"
            value={email}
            inputMode="email"
            disabled={user.isLoading}
            onChange={fieldChangeHandler}
          />
          <FormField
            type="text"
            label="Company"
            name="company"
            value={company}
            disabled={user.isLoading}
            onChange={fieldChangeHandler}
          />
          <FormField
            type="text"
            inputMode="tel"
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            disabled={user.isLoading}
            onChange={fieldChangeHandler}
          />
        </FlexBox>
        <DraftEditor
          spellCheck
          editorState={editorState}
          onFocus={textAreaFocusHandler}
          onEditorStateChange={setEditorState}
          wrapperClassName="email-editor"
          editorClassName="email-editor__textarea"
          placeholder={textAreaTouched ? '' : 'Write a message...'}
          toolbar={{
            image: {
              previewImage: true,
              uploadEnabled: true,
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: false },
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg,application/*',
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
    </>
  );
};

export default EmailEditor;
