import React from 'react';
import { Row, Col } from 'reactstrap';
import { getFieldEditorProps } from 'app/utils';
import ButtonForm from 'app/components/ButtonForm';
import TextEditor from 'app/components/Editor/index';
import { InjectedFormikProps } from 'formik';
import { t } from 'app/i18n';
import MediaContents from 'app/components/MediaContents';

interface IProps {
  submitForm: any;
  isSubmitting: boolean;
  feedbackDetail: any;
  isFeedback: boolean;
}
export type EnhancedProps = InjectedFormikProps<IProps, any>;

const FormFeedback = (props: EnhancedProps) => {
  const {
    setFieldValue,
    submitForm,
    isSubmitting,
    isFeedback = true,
    values,
  } = props;

  const { files } = values;

  const onChangeMedia = (newFiles: string) => {
    setFieldValue('files', newFiles);
  };

  return (
    <Row>
      <Col md={12}>
        <TextEditor
          {...getFieldEditorProps('content', props)}
          label={t('APP.FEEDBACK.CONTENT')}
        />
      </Col>
      <Col md={12} className="mb-2">
        <MediaContents
          data={files}
          isDescription={false}
          onChangeMedia={onChangeMedia}
          isFeedback={isFeedback}
        />
      </Col>

      <Col>
        <ButtonForm
          onSubmit={submitForm}
          isLoading={isSubmitting}
          submitLabel={t('APP.BUTTON_FORM.EDIT')}
          cancelLabel={t('APP.BUTTON_FORM.CANCEL')}
        />
      </Col>
    </Row>
  );
};

export default FormFeedback;
