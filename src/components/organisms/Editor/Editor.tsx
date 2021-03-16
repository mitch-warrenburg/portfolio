import React, { FC, useState, useCallback } from 'react';
import { EditorProps } from './types';
import Button from '../../atoms/Button';
import draftToHtml from 'draftjs-to-html';
import FlexBox from '../../atoms/FlexBox';
import FormField from '../../molecules/FormField';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import './styles.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const uploadImageCallBack = (file: File) => {};

const editorStateToHtml = (editorState: EditorState): string => {
  return draftToHtml(convertToRaw(editorState.getCurrentContent()));
};

const Editor: FC<EditorProps> = () => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [editorHtml, setEditorHtml] = useState<string>(editorStateToHtml(editorState));

  const submitButtonClickHandler = useCallback(() => {
    setEditorHtml(editorStateToHtml(editorState));
  }, [editorState]);

  return (
    <FlexBox direction="column" align="flex-end" margin="16px 0 0 0">
      <FlexBox justify="flex-start" wrap="wrap">
        <FormField label="First Name" />
        <FormField label="Last Name" />
        <FormField label="Company" />
        <FormField label="Email" />
        <FormField label="Phone Number" />
      </FlexBox>
      <div>
        <DraftEditor
          spellCheck
          placeholder="Compose your message here..."
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="email-editor"
          editorClassName="email-editor__textarea"
          toolbar={{
            image: {
              uploadEnabled: true,
              previewImage: true,
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: false },
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg,application/*',
            },
            options: [
              'inline',
              'blockType',
              'fontSize',
              'fontFamily',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              'embedded',
              'emoji',
              'image',
              'remove',
              'history',
            ],
          }}
        />
      </div>
      <Button transparent onClick={submitButtonClickHandler}>
        Submit
      </Button>
    </FlexBox>
  );
};

Editor.defaultProps = {};

export default Editor;
