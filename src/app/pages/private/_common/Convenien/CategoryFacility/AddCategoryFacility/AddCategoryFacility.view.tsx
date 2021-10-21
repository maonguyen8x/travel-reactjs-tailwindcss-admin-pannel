import React from 'react';
import { Row } from 'reactstrap';
import { CustomTextInput } from 'app/utils';
import { EnhancedProps } from './AddCategoryFacility.type';
import { dataCategoryFacility } from './AddCategoryFacility.data';

const CategoryFacilityAdd = (props: EnhancedProps) => (
  <Row>
    {dataCategoryFacility(props).map((item, index) => (
      <CustomTextInput {...item} key={index} />
    ))}
  </Row>
);

export default CategoryFacilityAdd;
