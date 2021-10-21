import React from 'react';
import { InjectedFormikProps } from 'formik';
import { t } from 'app/i18n';
import PopoverItem from 'app/components/Popover';
import SquareImage from 'app/components/SquareImage/SquareImage';
import { uploadBackgroundPostFile } from 'app/utils';
import { COLORS } from 'app/constants';

interface IProps {
  props: EnhancedProps;
}

export type EnhancedProps = InjectedFormikProps<IProps, any>;

const FormAddBackground = (props: EnhancedProps) => {
  const {
    setFieldValue,
    values,
    setValues,
    handleSubmit,
    isSubmitting,
  } = props;

  const uploadFile = async (event: any) => {
    const image = await uploadBackgroundPostFile(event);
    setValues({
      ...values,
      files: image?.file,
      url: image?.url,
      name: image?.file?.[0]?.name,
    });
  };

  const renderColor = () => {
    const DATA = [
      {
        color: 'bg-white',
        value: COLORS.WHITE,
      },
      {
        color: 'bg-black',
        value: COLORS.BLACK,
      },
      {
        color: 'bg-red-400',
        value: COLORS.PINK,
      },
      {
        color: 'bg-yellow-400',
        value: COLORS.YELLOW,
      },
      {
        color: 'bg-blue-400',
        value: COLORS.BLUE,
      },
      {
        color: 'bg-green-500',
        value: COLORS.N_GREEN,
      },
      {
        color: 'bg-yellow-900',
        value: COLORS.BROWN,
      },
    ];
    return (
      <>
        <label className="text-default text-2xl p-6 uppercase">
          {t('background_post.defualt_color')}
        </label>
        <div className="flex flex-row justify-between items-center space-x-10 mx-4">
          {DATA?.map((items: any, index: number) => (
            <div
              className={`w-8 h-8 ring-1 rounded-full cursor-pointer ${items?.color}`}
              key={index}
              onClick={() => setFieldValue('color', items?.value)}
            />
          ))}
        </div>
      </>
    );
  };

  const onRemoveImage = () => {
    setValues({
      ...values,
      files: [],
      url: '',
      name: '',
    });
  };

  return (
    <div className="m-auto px-5 py-2">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="text-2xl text-default font-semibold">
            {t('background_post.image')}
          </label>
          <div className="relative bg-gray-200 flex items-center">
            <input
              className="opacity-0 w-full p-3 z-10 cursor-pointer"
              type="file"
              onChange={uploadFile}
            />
            <span className="absolute left-0 bg-menu-active p-3 text-white">
              <i className="fas fa-image" /> {t('background_post.choose_image')}
            </span>
            <span className="absolute left-40 bg-transparent text-default ">
              {values?.name}
            </span>
          </div>
          <div>
            {values?.url && (
              <div className="mt-8 relative">
                <SquareImage className="" src={values?.url} />
                <i
                  className="fas fa-trash bg-gray-400 absolute inset-0 opacity-0 flex justify-center items-center text-5xl cursor-pointer text-white hover:opacity-30"
                  onClick={onRemoveImage}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="text-2xl text-default font-semibold">
            {t('background_post.color')}
          </label>
          <div className="relative bg-gray-200 p-3">
            <div className="opacity-0 w-full z-10 cursor-pointer" />
            <div className="absolute top-0 left-0 bg-menu-active border-b-2 border-default flex items-center justify-center">
              <PopoverItem
                name={<i className="fas fa-pen text-xl text-white px-8 py-3" />}
                popoverKey={'color'}
                body={renderColor()}
                placement="bottom-start"
              />
            </div>
            <span className="ml-28 bg-transparent text-default ">
              {values?.color}
            </span>
          </div>
          <div className="text-right">
            <button
              className="bg-green-500 my-4 px-4 py-3 rounded-md text-xl text-white"
              disabled={!values?.files || !values?.color || isSubmitting}
              onClick={() => handleSubmit()}
            >
              {t('background_post.complete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddBackground;
