import { CROP_TYPES } from 'app/constants';

export const getOriginImageSize = (data: any) => {
  const currentWidth =
    !!data?.length &&
    !!data?.[data?.length - 1]?.id &&
    JSON.parse(data?.[data?.length - 1]?.metadata)?.width;
  const currentHeight =
    !!data?.length &&
    !!data?.[data?.length - 1]?.id &&
    JSON.parse(data?.[data?.length - 1]?.metadata)?.height;
  return { currentWidth, currentHeight };
};

export const getImageRatio = (currentWidth: number, currentHeight: number) => {
  if (currentHeight === currentWidth) {
    return CROP_TYPES.NORMAL;
  }
  if (currentHeight > currentWidth) {
    return CROP_TYPES.OPTIMIZATION_HEIGHT;
  }
  if (currentHeight < currentWidth) {
    return CROP_TYPES.OPTIMIZATION_WIDTH_SS;
  }
  if (currentWidth / currentHeight > CROP_TYPES.OPTIMIZATION_WIDTH_XL) {
    return CROP_TYPES.OPTIMIZATION_WIDTH_XL;
  }
  if (currentWidth / currentHeight < CROP_TYPES.OPTIMIZATION_WIDTH_SS) {
    return CROP_TYPES.OPTIMIZATION_WIDTH_SS;
  }
  if (
    currentWidth / currentHeight > CROP_TYPES.OPTIMIZATION_WIDTH_SS &&
    currentWidth / currentHeight < CROP_TYPES.OPTIMIZATION_WIDTH_XL
  ) {
    return currentWidth / currentHeight;
  }
  return CROP_TYPES.NORMAL;
};
