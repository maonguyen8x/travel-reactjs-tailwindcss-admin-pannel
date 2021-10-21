import React, { useEffect } from 'react';
import { t } from 'app/i18n';
import { Col, Row } from 'reactstrap';
import NormalInput from 'app/components/Form/NormalInput';
import { formatTime } from 'app/utils';
import TextEditor from 'app/components/Editor';

const PolicyDetail = (props: any) => {
  const { policyDetail } = props;

  useEffect(() => {
    const { id } = props.match.params;
    props.getPolicyById(id);
  }, []);

  return (
    <Row>
      <NormalInput
        value={policyDetail?.alias}
        label={t('APP.POLICY.ALIAS')}
        disabled
        as="Col"
        md="6"
      />
      <NormalInput
        value={formatTime(policyDetail?.createdAt)}
        label={t('APP.POLICY.CREATED')}
        disabled
        as="Col"
        md="6"
      />
      <Col md={12}>
        <TextEditor
          value={policyDetail?.content}
          label={t('APP.POLICY.CONTENT')}
          readOnly
        />
      </Col>
    </Row>
  );
};

export default PolicyDetail;
