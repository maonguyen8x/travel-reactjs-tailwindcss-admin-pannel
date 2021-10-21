import React from 'react';
import { Row } from 'reactstrap';
import { CustomTextInput } from 'app/utils';
import { EnhancedProps } from './EditCategoryAmenity.type';
import { dataCategoryAmenity } from './EditCategoryAmenity.data';

const CategoryAmenityEdit = (props: EnhancedProps) => (
  <Row>
    {dataCategoryAmenity(props).map((item, index) => (
      <CustomTextInput {...item} key={index} />
    ))}
  </Row>
);

export default CategoryAmenityEdit;
