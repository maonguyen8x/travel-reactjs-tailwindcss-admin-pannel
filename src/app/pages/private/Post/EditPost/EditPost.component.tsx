import React from 'react';
import { getFieldProps } from 'app/utils';
import { InjectedFormikProps } from 'formik';
import { t } from 'app/i18n';
import { ButtonForm, InputTextarea } from 'app/components';
import CropImage from 'app/components/CropImage';
import { IProps } from './EditPost.type';
import AccessTypeSelect from '../../CreateNew/AddPost/_components/AccessTypeSelectInput';
import SelectLocationInput from './_components/LocationSelectInput';

export type EnhancedProps = InjectedFormikProps<IProps, any>;

const FormPost = (props: EnhancedProps) => {
  const { setFieldValue, handleSubmit } = props;

  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        <div className="mt-1">
          <AccessTypeSelect {...getFieldProps('accessType', props)} />
          <InputTextarea
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

export default FormPost;
