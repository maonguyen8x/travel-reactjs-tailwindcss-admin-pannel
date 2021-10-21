import React from 'react';
import { Row } from 'reactstrap';
import { CustomTextInput } from 'app/utils';
import { EnhancedProps } from './AddCategoryAmenity.type';
import { dataCategoryAmenity } from './AddCategoryAmenity.data';

const CategoryAmenityAdd = (props: EnhancedProps) => (
  <Row>
    {dataCategoryAmenity(props).map((item, index) => (
      <CustomTextInput {...item} key={index} />
    ))}
  </Row>
);

export default CategoryAmenityAdd;
