import React, { memo } from 'react';
import { InjectedFormikProps } from 'formik';
import { getFieldProps } from 'app/utils';
import { t } from 'app/i18n';
import InputTextArea from 'app/components/Form/InputTextarea';
import ButtonForm from 'app/components/ButtonForm';
import CropImage from 'app/components/CropImage';
import { IProps, IValues } from './AddPost.type';
import SelectLocationInput from './_components/LocationSelectInput';
import AccessTypeSelect from './_components/AccessTypeSelectInput';

export type EnhancedProps = InjectedFormikProps<IProps, IValues>;

const FormPost = (props: EnhancedProps) => {
  const { setFieldValue, handleSubmit } = props;

  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        <div className="mt-1">
          <AccessTypeSelect {...getFieldProps('accessType', props)} />
          <InputTextArea
            {...getFieldProps('content', props)}
            label={t('post.content')}
            maxLength={5000}
          />
          <CropImage
            onChangeMedia={(newFiles: string) => {
              setFieldValue('files', newFiles);
            }}
            {...getFieldProps('files', props)}
          />
        </div>
        <SelectLocationInput
          onSelectLocation={(locationId: number) =>
            setFieldValue('locationId', locationId)
          }
          {...getFieldProps('locationId', props)}
        />
      </div>
      <ButtonForm
        onSubmit={handleSubmit}
        submitLabel={t('button.submit')}
        cancelLabel={t('button.cancel')}
      />
    </>
  );
};

export default memo(FormPost);
