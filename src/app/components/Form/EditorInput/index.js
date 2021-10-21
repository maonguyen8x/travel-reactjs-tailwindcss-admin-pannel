import React, { memo } from 'react';
import { Label, InputGroup, Col } from 'reactstrap';
import { ErrorMessage } from 'formik';
import TextEditor from '../Editor';

const EditorInput = (props) => {
  const {
    label,
    name,
    errMessage,
    touched,
    value,
    disabled = false,
    col,
    setFieldValue,
  } = props;

  return (
    <Col md={col}>
      <Label>{label}</Label>
      <InputGroup className="mb-3">
        <TextEditor
          onCompleteChangeText={(val) => setFieldValue(name, val)}
          initValue={value}
          readOnly={disabled}
          className={errMessage && touched ? ' is-invalid' : ''}
        />
        <ErrorMessage
          name={name}
          component="div"
          className="invalid-feedback"
        />
      </InputGroup>
    </Col>
  );
};
export default memo(EditorInput);
