import React from 'react';
import { Row, Col } from 'reactstrap';
import TextInput from 'app/components/Form/TextInput';
import { getFieldProps, getFieldEditorProps } from 'app/utils';
import { t } from 'app/i18n';
import TextEditor from 'app/components/Editor/index';
import { InjectedFormikProps } from 'formik';
import { IProps } from './EditPolicy.type';

export type EnhancedProps = InjectedFormikProps<IProps, any>;

const FormPolicy = (props: EnhancedProps) => (
  <Row>
    <Col md={6}>
      <TextInput
        {...getFieldProps('alias', props)}
        label={t('APP.POLICY.ALIAS')}
      />
    </Col>
    <Col md={12}>
      <TextEditor
        {...getFieldEditorProps('content', props)}
        label={t('APP.POLICY.CONTENT')}
      />
    </Col>
  </Row>
);

export default FormPolicy;
