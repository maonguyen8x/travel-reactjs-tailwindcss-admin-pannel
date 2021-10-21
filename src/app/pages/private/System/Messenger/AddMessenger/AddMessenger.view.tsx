import React, { useState } from 'react';
import { InjectedFormikProps } from 'formik';
import { getFieldProps } from 'app/utils';
import { t } from 'app/i18n';
import InputTextArea from 'app/components/Form/InputTextarea';
import Images from 'app/assets/images';

interface IProps {
  props: EnhancedProps;
  isLoading: boolean;
  ON_GO_BACK: any;
}

export type EnhancedProps = InjectedFormikProps<IProps, any>;

const FormLocation = (props: EnhancedProps) => {
  const { handleSubmit, isLoading, ON_GO_BACK } = props;

  const [publish, setPublish] = useState(false);

  const onPublic = () => {
    setPublish(!publish);
  };

  return (
    <div className="m-auto">
      <div className="grid gap-4 grid-cols-1 m-10">
        <InputTextArea
          {...getFieldProps('messageVi', props)}
          label={t('message.input_vi')}
          icon={Images.vi.default}
          rows={8}
        />
        <div>
          <InputTextArea
            {...getFieldProps('messageEn', props)}
            label={t('message.input_en')}
            icon={Images.en.default}
            rows={8}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white text-xl px-3 py-2 rounded-sm flex items-center"
            onClick={onPublic}
          >
            <img
              className={'bg-white rounded-full mr-2'}
              src={Images.unPublish.default}
              alt="icon"
            />
            {publish ? t('message.publish') : t('message.un_publish')}
          </button>
        </div>
        <div className="text-left flex space-x-4">
          <button
            className="bg-gray-400 text-xl text-white px-10 py-3"
            onClick={ON_GO_BACK}
          >
            {t('message.cancel')}
          </button>
          <button
            className="bg-green-500 text-xl text-white px-4 py-3"
            disabled={isLoading}
            onClick={() => handleSubmit()}
          >
            {isLoading ? 'Loading...' : t('message.complete')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormLocation;
