import 'regenerator-runtime/runtime';
import React, { FC, useCallback, useEffect } from 'react';
import { EditorProps } from './types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { CKEditorConfig } from './constants';
import CKEditor from '@ckeditor/ckeditor5-react';
import { useEventCallback } from '../../../hooks';
import { FirebaseUploadAdapter } from '../../../util';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './styles.scss';

const Container = styled.div`
  position: relative;
  display: block;
`;

const Editor: FC<EditorProps> = ({ contentRef }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    contentRef.current = '';
  }, []);

  const setUploadAdapter = useCallback((editor: any) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) =>
      new FirebaseUploadAdapter(loader, dispatch);
  }, []);

  const editorContentChangeHandler = useEventCallback((event: Event, editor: any) => {
    contentRef.current = editor.getData();
  });

  return (
    <Container>
      <CKEditor
        editor={ClassicEditor}
        config={CKEditorConfig}
        onInit={setUploadAdapter}
        onChange={editorContentChangeHandler}
      />
    </Container>
  );
};

export default Editor;
