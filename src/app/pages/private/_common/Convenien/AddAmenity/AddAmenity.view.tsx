import React from 'react';
import { Row } from 'reactstrap';
import { CustomTextInput } from 'app/utils';
import MediaContents from 'app/components/MediaContents';
import { EnhancedProps } from './AddAmenity.type';
import { dataCategoryAmenity } from './AddAmenity.data';

const CategoryAmenityAdd = (props: EnhancedProps) => {
  const { setFieldValue, values } = props;
  const { files } = values;

  const onChangeMedia = (newFiles: string) => {
    setFieldValue('files', newFiles);
  };

  return (
    <Row>
      {dataCategoryAmenity(props).map((item, index) => (
        <CustomTextInput {...item} key={index} />
      ))}
      <MediaContents
        data={files}
        onChangeMedia={onChangeMedia}
        isDescription={false}
        multiple={false}
        length={files?.length === 0}
      />
    </Row>
  );
};

export default CategoryAmenityAdd;
