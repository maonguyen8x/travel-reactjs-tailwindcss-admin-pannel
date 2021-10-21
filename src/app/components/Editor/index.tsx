import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './editor.scss';
import { Label, Col } from 'reactstrap';
// import { uploadImageCallBack } from '../../../../../controller/utils';
import { ToolbarOptions } from './config';
import { IProps } from './type';

const TextEditor = ({
  onChange,
  value,
  className,
  readOnly,
  label,
  as,
  md,
}: IProps) => {
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );

  const [isInitData, setInitData] = useState(false);
  const onEditorStateChange = (editorStateChange: any) => {
    setEditorState(editorStateChange);

    const editor: any = convertToRaw(editorStateChange.getCurrentContent());
    if (onChange) {
      onChange(draftToHtml(editor));
    }
  };
  useEffect(() => {
    if (value && value.trim() !== '') {
      const blocksFromHtml = htmlToDraft(value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  useEffect(() => {
    if (value && value.trim() !== '' && !isInitData) {
      const blocksFromHtml = htmlToDraft(value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
      setInitData(true);
    }
  }, [value]);

  const onBlur = () => {
    if (onChange && editorState) {
      const editor: any = convertToRaw(editorState.getCurrentContent());
      onChange(draftToHtml(editor));
    }
  };

  const renderContent = () => (
    <>
      <Label>{label}</Label>
      <div className="text-editor">
        <Editor
          readOnly={readOnly}
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName={`demo-editor ${className} ${
            readOnly && 'read-only-editor'
          }`}
          toolbarClassName={readOnly ? 'hide-toolbar' : ''}
          onEditorStateChange={onEditorStateChange}
          onBlur={onBlur}
          toolbar={ToolbarOptions}
        />
      </div>
    </>
  );

  if (as === 'Col') {
    return <Col md={md}>{renderContent()}</Col>;
  }

  return renderContent();
};

export default TextEditor;
