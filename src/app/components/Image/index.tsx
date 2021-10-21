import React, { memo } from 'react';
import { CardImg } from 'reactstrap';

const Image = (props: any) => {
  const { src, onClick } = props;

  return (
    <CardImg
      className="w-full"
      onClick={onClick}
      width="auto"
      src={src}
      alt="media"
    />
  );
};
export default memo(Image);
