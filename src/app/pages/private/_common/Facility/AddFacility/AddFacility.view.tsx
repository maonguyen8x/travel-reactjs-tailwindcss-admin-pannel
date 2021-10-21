import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { t } from 'app/i18n';
import TextInput from 'app/components/Form/TextInput';
import { getFieldProps } from 'app/utils';
import { listPageTour } from 'app/services/ListPageTour';
import Autocomplete from 'app/components/AutoCompleted';
import { EnhancedProps } from './AddFacility.type';

const FacilityAdd = (props: EnhancedProps) => {
  const { token, setFieldValue } = props;

  const [dataFacility, setDataFacility] = useState([]);

  const getList = async () => {
    const result = await listPageTour.getListFacilityCategory(token);
    setDataFacility(result);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Row>
      {/* <Col md={12} className="mb-3">
        <Autocomplete
          dataFacility={dataFacility}
          label={t('APP.TOUR.NAME')}
          setFieldValue={setFieldValue}
        />
      </Col> */}
      <TextInput
        {...getFieldProps('FacilityVi', props)}
        label={t('APP.AMENITIES.VIETNAM')}
        as="Col"
        md="6"
      />
      <TextInput
        {...getFieldProps('FacilityEn', props)}
        label={t('APP.AMENITIES.ENGLISH')}
        as="Col"
        md="6"
      />
    </Row>
  );
};

export default FacilityAdd;
