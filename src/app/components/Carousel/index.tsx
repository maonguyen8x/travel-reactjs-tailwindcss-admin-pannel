/* eslint-disable jsx-a11y/media-has-caption */
import React, { memo, useState } from 'react';
import { CarouselItem, Carousel, CarouselControl } from 'reactstrap';
import { VIDEO_TYPES } from 'app/constants';
import { IProps } from './type';
import './styled.css';

const CarouselModal = (props: IProps) => {
  const { items, indexCarousel = 0, className } = props;

  const [activeIndex, setActiveIndex] = useState(indexCarousel);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  // const goToIndex = (newIndex: any) => {
  //   if (animating) return;
  //   setActiveIndex(newIndex);
  // };

  const slides = items?.map((item: any, index: number) => (
    <CarouselItem
      className="text-center custom-tag"
      tag="div"
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={index}
    >
      {item?.resourceType === VIDEO_TYPES.VIDEO ? (
        <div className="flex justify-center items-center">
          <video controls>
            <source src={item?.url} type="video/mp4" />
          </video>
        </div>
      ) : (
        <img className={`${className} card-img`} src={item?.url} />
      )}
    </CarouselItem>
  ));

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      {slides}
      {items?.length > 1 && (
        <>
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </>
      )}
    </Carousel>
  );
};
export default memo(CarouselModal);
