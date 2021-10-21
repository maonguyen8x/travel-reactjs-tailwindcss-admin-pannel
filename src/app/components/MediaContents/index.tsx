import React, { memo, useState, useEffect } from 'react';
import { t } from 'app/i18n';
import Swal from 'sweetalert2';
import { compose, onlyUpdateForKeys } from 'recompose';
import Carousel from '../Carousel';
import Modal from '../Modal';
import { IProps } from './type';
import { toNumber } from '../../utils';

const videoTypes = [
  'video/mp4',
  'video/x-msvideo',
  'video/x-flv',
  'video/quicktime',
  'video/x-ms-wmv',
];

const MediaItem = memo(
  ({
    type,
    imageUrl = [],
    onClick,
    description,
    onRemoveFile,
    onChangeDescription,
    readOnly,
    isDescription,
  }: IProps) => {
    const url = window.URL.createObjectURL(
      new Blob([imageUrl], { type: 'image/jpeg' })
    );

    return (
      <div className="relative group">
        {videoTypes.find((item) => item === type) ? (
          <video
            id="background-video"
            loop
            className="w-full h-80 bg-cover shadow-md"
          >
            <source
              src={url}
              type="video/mp4"
              className="w-full h-80 bg-cover shadow-md"
            />
            <track
              src="captions_en.vtt"
              kind="captions"
              label="english_captions"
            />
          </video>
        ) : (
          <div
            className="w-full h-80 bg-cover shadow-md"
            style={{ backgroundImage: `url(${url})` }}
          />
        )}
        {!readOnly && (
          <div className="absolute inset-0 flex justify-center items-center text-2xl text-white opacity-0 bg-black bg-opacity-10 group-hover:opacity-100">
            <i onClick={onRemoveFile} className="fas fa-trash remove" />
          </div>
        )}
        <div>
          {readOnly && (
            <div>
              <i onClick={onClick} className="fas fa-search-plus zoom" />
            </div>
          )}
        </div>

        {!readOnly && isDescription && (
          <div>
            <input
              name="text"
              placeholder="Description"
              value={description}
              onChange={(e) => onChangeDescription(e.target.value)}
            />
          </div>
        )}
      </div>
    );
  }
);

const MediaContents = ({
  data,
  label = t('media.choose'),
  onChangeMedia,
  isDescription = false,
  readOnly = false,
  multiple = true,
  length = true,
  errMessage,
  touched,
}: IProps) => {
  const [indexCarousel, setIndexCarousel] = useState(0);
  const [isShowModal, setShowModal] = useState(false);
  const [imagesPreview, setImagePreview] = useState(data);

  useEffect(() => {
    setImagePreview(data);
  }, [data]);

  const onOpenMediaContent = (index: any) => {
    setIndexCarousel(index);
    setShowModal(true);
  };

  const onAddFile = (e: any) => {
    if (videoTypes.find((item) => item === e.target.files[0].type)) {
      const file = e.target.files[0];
      if (toNumber((file.size / (1024 * 1024)).toFixed(2)) > 50) {
        Swal.fire(
          'File Size Too Large',
          'File size must be less than 50 Mb',
          'error'
        );
        return;
      }
      const media = new Audio(window.URL.createObjectURL(file));
      media.onloadedmetadata = function () {
        // video limited 120s
        if (media.duration <= 120) {
          const files = e?.target?.files;
          const newFiles = [...imagesPreview, ...files];
          onChangeMedia(newFiles);
        } else {
          Swal.fire(
            'File Duration Too Long',
            'File Duration must be less than 120 seconds',
            'error'
          );
        }
      };
    } else {
      const files = e?.target?.files;
      const newFiles = [...imagesPreview, ...files];
      onChangeMedia(newFiles);
    }
  };

  const onRemoveFile = (index: any) => {
    const mediaCache = [...imagesPreview];
    mediaCache.splice(index, 1);
    onChangeMedia(mediaCache);
  };

  const onChangeDescription = (value: any, index: any) => {
    const files = [...imagesPreview];
    if (files[index] && files[index].id) {
      files[index] = { ...files[index], description: value };
      onChangeMedia(files);
    } else {
      files[index] = new File([files[index]], value);
      onChangeMedia(files);
    }
  };

  return (
    <div className="mb-8">
      <label className="text-xl font-medium text-gray-700 cursor-pointer">
        {label}
      </label>
      {length && !readOnly && (
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
            <p className="text-base mb-0">{'Chọn ảnh'}</p>
          </label>
          <input
            className="w-full opacity-0  cursor-pointer"
            type="file"
            id="upload-file"
            accept={'.jpg, .jpeg, .png, .mp4, .mov, .flv'}
            multiple={multiple}
            onChange={(e) => onAddFile(e)}
          />
        </div>
      )}
      {touched && (
        <p className={`text-xl text-red-500 ${!errMessage && 'hidden'}`}>
          {errMessage}
        </p>
      )}

      <div className="grid grid-cols-4 gap-3 py-3">
        {imagesPreview &&
          imagesPreview.map((item: any, index: string) => (
            <MediaItem
              type={item.type}
              key={index}
              id={item.id}
              status={item.status}
              description={item.description}
              imageUrl={item.id ? item.url : item}
              onChangeDescription={(value: any) =>
                onChangeDescription(value, index)
              }
              onClick={() => onOpenMediaContent(index)}
              onRemoveFile={() => onRemoveFile(index)}
              readOnly={readOnly}
              isDescription={isDescription}
            />
          ))}
      </div>
      <Modal
        header={t('stay.image')}
        isShowModal={isShowModal}
        toggle={() => setShowModal(!isShowModal)}
        body={
          <Carousel indexCarousel={indexCarousel} items={imagesPreview} stay />
        }
      />
    </div>
  );
};

const enhancer = compose<any, any>(
  onlyUpdateForKeys([
    'data',
    'label',
    'isDescription',
    'readOnly',
    'multiple',
    'length',
    'errMessage',
    'touched',
  ])
);

export default enhancer(MediaContents);
