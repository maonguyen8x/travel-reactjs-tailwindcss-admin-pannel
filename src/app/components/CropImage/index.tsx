import React, { useState, useEffect, memo } from 'react';
import Cropper from 'react-easy-crop';
import { t } from 'app/i18n';
import { CROP_TYPES } from 'app/constants';
import { getCroppedImg, customSize } from 'app/components/CropImage/crop';
import { uniqBy, reverse } from 'ramda';
import { IProps } from './type';
import './styles.css';
import { getOriginImageSize, getImageRatio } from './utils';
import SweetAlert from '../SweetAlert';

let timeoutId: any = 0;

const CropImage = ({
  onChangeMedia,
  errMessage,
  touched,
  value = [],
}: IProps) => {
  const [state, setState]: any = useState({
    crop: { x: 0, y: 0 },
    zoom: 1,
    cropType: CROP_TYPES.NORMAL,
    imageOrigin: { width: 0, height: 0 },
    imageSrc: '',
    croppedAreaPixels: { width: 0, height: 0 },
    newImage: [],
    id: '',
    imagesPreview: [],
    filesUpload: [],
    files: [],
  });

  const {
    crop,
    zoom,
    cropType,
    imageOrigin,
    imageSrc,
    croppedAreaPixels,
    newImage,
    imagesPreview,
    filesUpload,
    id,
    files,
  } = state;

  const initState = {
    id: '',
    zoom: 1,
    files: [],
    newImage: [],
    imageSrc: '',
    filesUpload: [],
    imagesPreview: [],
    crop: { x: 0, y: 0 },
    cropType: CROP_TYPES.NORMAL,
    imageOrigin: { width: 0, height: 0 },
    croppedAreaPixels: { width: 0, height: 0 },
  };

  const formatId: any = id === '' ? newImage?.length - 1 : id;

  const originImageSize = getOriginImageSize(value);

  useEffect(() => {
    if (!!value?.length) {
      setState({
        ...state,
        filesUpload: [...value],
        files: [...value],
        cropType: !!value?.[value?.length - 1]?.id
          ? getImageRatio(
              originImageSize.currentWidth,
              originImageSize.currentHeight
            )
          : cropType,
      });
    }
  }, [value]);

  const onCrop = (crop: any) => {
    setState({
      ...state,
      crop,
    });
  };

  const onZoom = (zoom: any) => {
    setState({
      ...state,
      zoom,
    });
  };

  const onCropComplete = async (_: any, croppedAreaPixels: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(async () => {
      setState({
        ...state,
        croppedAreaPixels,
      });
      if (filesUpload?.length > 0) {
        await showCroppedImage(croppedAreaPixels);
      }
    }, 300);
  };

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const { files } = e.target;
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          const { result } = event.target;
          setState({
            ...state,
            imageSrc: result,
          });
          newImage.push({ url: result });
        });
        reader.readAsDataURL(file);
      }
    }
  };

  const showCroppedImage = async (croppedAreaPixels: any) => {
    const croppedImages: any = await getCroppedImg(imageSrc, croppedAreaPixels);
    const resizeImages: any = await customSize(
      croppedImages[0],
      croppedAreaPixels,
      formatId
    );
    imagesPreview.push({
      image: resizeImages[0],
      objUrl: resizeImages[1],
      id: resizeImages[2],
    });

    const data =
      imagesPreview && uniqBy((x: any) => x?.id, reverse(imagesPreview));
    const image = data.map((item: any) => ({ url: item?.image }));
    const objUrl = data.map((item: any) => ({
      url: item?.image,
      uploadSize: item?.objUrl,
    }));

    setState({
      ...state,
      imagesPreview: data,
      filesUpload: [...image, ...value],
      files: [...objUrl, ...value],
    });
  };

  const imageSizeOrigin = (size: any) => {
    setState({
      ...state,
      imageOrigin: {
        ...size,
        width: size.naturalWidth,
        height: size.naturalHeight,
      },
    });
  };

  const onChangeOptimizeCrop = () => {
    const ratio = getImageRatio(imageOrigin.width, imageOrigin.height);
    setState({
      ...state,
      cropType: ratio,
      crop: { x: 0, y: 0 },
    });
  };

  const onChangeNormalCrop = () => {
    setState({
      ...state,
      cropType: CROP_TYPES.NORMAL,
      crop: { x: 0, y: 0 },
    });
  };

  const removeSelectedImage = (index: number) => () => {
    // remove uploaded image
    const uploadImage = [...filesUpload];
    uploadImage.splice(index, 1);

    // remove uploaded files size
    const newFiles = [...files];
    newFiles.splice(index, 1);

    setState({
      ...state,
      files: newFiles,
      filesUpload: uploadImage,
    });

    onChangeMedia(newFiles);
  };

  const removePreviewImage = (index: number) => () => {
    // remove previews image
    const currentImage = [...imagesPreview];
    currentImage.splice(index, 1);

    // remove uploaded image
    const uploadImage = [...filesUpload];
    uploadImage.splice(index, 1);

    // remove uploaded files size
    const newFiles = [...files];
    newFiles.splice(index, 1);

    setState({
      ...state,
      files: newFiles,
      filesUpload: uploadImage,
      imagesPreview: currentImage,
    });
  };

  const showImage = (image: string, index: string) => {
    setState({
      ...state,
      imageSrc: image,
      id: index,
      crop: { x: 0, y: 0 },
      zoom: 1,
      cropType: filesUpload?.length > 0 ? cropType : CROP_TYPES.NORMAL,
    });
  };

  const onDone = () => {
    if (files?.length > 15) {
      SweetAlert.warning(t('crop.total_images'));
      return;
    }

    setState({
      ...initState,
      cropType,
    });
    onChangeMedia(files);
  };

  const onClose = () => {
    setState(initState);
    onChangeMedia([]);
  };

  const renderPreviewImages = () => {
    return (
      <>
        {newImage?.length > 0 && (
          <div className="flex flex-row items-center space-x-2 border-b-2 overflow-x-scroll m-2">
            {newImage &&
              newImage?.map((item: any, index: string) => (
                <img
                  className="h-40 max-w-xs w-auto border-2 border-red-100 cursor-pointer"
                  onClick={() => showImage(item.url, index)}
                  key={index}
                  src={item.url}
                  alt="img"
                />
              ))}
            <div className="h-40 px-20 flex flex-row justify-center items-center relative  border-dashed border-2 bg-gray-100">
              <span className="text-4xl text-gray-500">+</span>
              <input
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                id="image"
                type="file"
                multiple
                onChange={onFileChange}
                accept="image/*"
              />
            </div>
          </div>
        )}
      </>
    );
  };

  const renderCropButton = () => {
    return (
      <div className="flex flex-row justify-center items-center space-x-10 my-4">
        {filesUpload?.length === 0 && (
          <>
            <button
              className="bg-gray-400 px-10 py-3 rounded shadow"
              onClick={onChangeNormalCrop}
            >
              <span className="text-white font-medium">{t('normal')}</span>
            </button>
            <button
              className="bg-blue-500 px-10 py-3  rounded shadow"
              onClick={onChangeOptimizeCrop}
            >
              <span className="text-white font-medium">
                {t('optimization')}
              </span>
            </button>
            <button
              onClick={() => showCroppedImage(croppedAreaPixels)}
              className="bg-yellow-400 px-10 py-3 rounded shadow"
            >
              <span className="text-white font-medium">
                {' '}
                {t('button.crop')}
              </span>
            </button>
            <button
              onClick={onClose}
              className="bg-red-400 px-10 py-3 rounded shadow"
            >
              <span className="text-white font-medium">
                {t('button.cancel')}
              </span>
            </button>
          </>
        )}
      </div>
    );
  };

  const renderImageCropResults = () => {
    return (
      <>
        {filesUpload && filesUpload?.length > 0 && (
          <>
            <div className="mx-4 my-2">
              <span className="text-2xl text-default italic font-light capitalize">
                {t('crop.note')}*
              </span>
            </div>
            <div className="bg-white shadow pb-10 mb-36">
              <div className="grid grid-cols-6 gap-2 relative 2xl:grid-cols-8">
                {filesUpload &&
                  filesUpload?.map((item: any, index: number) => (
                    <div
                      key={index}
                      style={{ backgroundImage: `url(${item?.url})` }}
                      className="group relative w-auto h-80 bg-contain bg-no-repeat bg-center shadow"
                    >
                      {!item?.id && !item?.uploadSize && (
                        <button className="opacity-0 bg-black bg-opacity-30 inset-0 w-full text-4xl absolute group-hover:opacity-100">
                          <i
                            onClick={removePreviewImage(index)}
                            className="fas fa-trash text-white "
                          />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
              <div className="text-right m-4">
                <button
                  onClick={onClose}
                  className="bg-red-400 px-10 py-3 rounded shadow mx-2"
                >
                  <span className="text-white font-medium">
                    {t('button.cancel')}
                  </span>
                </button>
                <button
                  onClick={onDone}
                  className="bg-green-500 px-10 py-3 rounded shadow mx-2"
                >
                  <span className="text-white font-medium">
                    {t('button.submit')}
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {imageSrc ? (
        <>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={cropType}
            onCropChange={onCrop}
            onCropComplete={onCropComplete}
            onZoomChange={onZoom}
            onMediaLoaded={imageSizeOrigin}
          />
          <div className="absolute top-full inset-x-0 z-10 w-full">
            {renderPreviewImages()}
            {renderCropButton()}
            {renderImageCropResults()}
          </div>
        </>
      ) : (
        <div className="relative my-4">
          <label className="mb-1">
            <span className="font-medium">{t('media.choose')}</span>
          </label>
          <div
            className={`flex flex-row bg-gray-100 h-16 ${
              errMessage && touched
                ? 'border-2 border-red-500 border-solid'
                : 'border'
            }`}
          >
            <label
              htmlFor="upload-file"
              className="flex items-center justify-between h-full w-40 flex-row bg-default px-3 text-white"
            >
              <i className="fas fa-images mr-1" />
              <p className="text-base mb-0">{t('button.upload')}</p>
            </label>
            <input
              className="w-full opacity-0 cursor-pointer"
              type="file"
              id="upload-file"
              accept="image/*"
              multiple
              onChange={(e) => onFileChange(e)}
            />
          </div>
          {touched && (
            <p
              className={`text-xl text-red-500 leading-relaxed ${
                !errMessage && 'hidden'
              }`}
            >
              {errMessage}
            </p>
          )}
          <div className="grid grid-cols-3 gap-2 relative my-4 2xl:grid-cols-4">
            {filesUpload &&
              filesUpload?.map((item: any, index: number) => (
                <div
                  key={index}
                  style={{ backgroundImage: `url(${item?.url})` }}
                  className="group relative w-auto h-80 bg-contain bg-no-repeat bg-center shadow"
                >
                  <button className="opacity-0 bg-black bg-opacity-30 inset-0 w-full text-4xl absolute group-hover:opacity-100">
                    <i
                      onClick={removeSelectedImage(index)}
                      className="fas fa-trash text-white "
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(CropImage, (oldProps, newProps) => {
  if (oldProps?.value !== newProps?.value) {
    return false;
  }
  if (oldProps?.touched !== newProps?.touched) {
    return false;
  }
  if (oldProps?.errMessage !== newProps?.errMessage) {
    return false;
  }
  return true;
});
