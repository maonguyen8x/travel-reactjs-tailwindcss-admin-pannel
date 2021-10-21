import React from 'react';
import { Col, Row } from 'reactstrap';
import { t } from 'app/i18n';
import { InjectedFormikProps } from 'formik';
import TextInput from 'app/components/Form/TextInput';
import { getFieldEditorProps, getFieldProps } from 'app/utils';
import TextEditor from 'app/components/Editor';

interface IProps {
  props: EnhancedProps;
}

export type EnhancedProps = InjectedFormikProps<IProps, any>;

const PolicyAdd = (props: EnhancedProps) => (
  <Row>
    <TextInput
      {...getFieldProps('alias', props)}
      label={t('APP.POLICY.ALIAS')}
      as="Col"
      md="12"
    />
    <Col md={12}>
      <TextEditor
        {...getFieldEditorProps('content', props)}
        label={t('APP.POLICY.CONTENT')}
      />
    </Col>
  </Row>
);

export default PolicyAdd;
