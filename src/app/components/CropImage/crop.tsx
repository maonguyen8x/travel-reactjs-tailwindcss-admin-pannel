import { IValuesResize } from './type';

const createImage = (url: any) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */

const reSize = ({
  width,
  height,
  maxHeight = 1080,
  maxWidth = 1080,
  minWidth = 320,
  minHeight = 320,
}: IValuesResize) => {
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }
  if (minWidth && width < minWidth) {
    height = Math.round((height * minWidth) / width);
    width = minWidth;
  }
  if (minHeight && height < minHeight) {
    width = Math.round((width * minHeight) / height);
    height = minHeight;
  }
  return { height, width };
};

export async function customSize(imageSrc: any, pixelCrop: any, id: string) {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx: any = canvas.getContext('2d');
  // const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

  const pixel = reSize(pixelCrop);

  let { width } = image;
  let { height } = image;

  canvas.width = pixel.width;
  canvas.height = pixel.height;

  width = pixel.width;
  height = pixel.height;

  ctx.drawImage(image, 0, 0, width, height);

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve([URL.createObjectURL(file), file, id]);
    }, 'image/jpeg');
  });
}

export async function getCroppedImg(imageSrc: any, pixelCrop: any) {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx: any = canvas.getContext('2d');

  // l???y pixel l???n nh???t ????? set
  const maxSize = Math.max(image.width, image.height);

  // set l???i size cho ???nh
  canvas.width = maxSize;
  canvas.height = maxSize;

  // set color
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // v??? ???nh v?? l??u d??? li???u
  ctx.drawImage(
    image,
    maxSize / 2 - image.width * 0.5,
    maxSize / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, maxSize, maxSize);

  // set size final
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // d??n h??nh ???nh ???? t???o v???i c??c hi???u s??? ch??nh x??c cho c??c gi?? tr??? c???t x, y.
  ctx.putImageData(
    data,
    Math.round(0 - maxSize / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - maxSize / 2 + image.height * 0.5 - pixelCrop.y)
  );

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve([URL.createObjectURL(file), file]);
    }, 'image/jpeg');
  });
}
