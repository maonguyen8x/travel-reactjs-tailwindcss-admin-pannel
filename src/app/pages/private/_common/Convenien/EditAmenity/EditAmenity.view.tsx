import React from 'react';
import { Row } from 'reactstrap';
import MediaContents from 'app/components/MediaContents';
import { CustomTextInput } from 'app/utils';
import { EnhancedProps } from './EditAmenity.type';
import { dataAmenity } from './EditAmenity.data';

const amenityEdit = (props: EnhancedProps) => {
  const { setFieldValue, values } = props;

  const { files } = values;

  const onChangeMedia = (newFiles: string) => {
    setFieldValue('files', newFiles);
  };

  return (
    <Row>
      {dataAmenity(props).map((item, index) => (
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

export default amenityEdit;
