import React from 'react';
import { Col } from 'reactstrap';
import { t } from 'app/i18n';
// import ModalSelect from 'app/components/ModalSelect';
import { LableStyle } from '../styled';

const Convenient = ({ amenities, facilities }: any) => (
  <Col md={12} className="mb-2">
    <LableStyle>{t('APP.STAY.CONVENIENT')}</LableStyle>
    {/* <ModalSelect
      label={t('APP.STAY.DETAIL.VIEW_CONVIENT')}
      dataFacilities={facilities}
      dataAmenities={amenities}
      disabled
    /> */}
  </Col>
);

export default Convenient;
