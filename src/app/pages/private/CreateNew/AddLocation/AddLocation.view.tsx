import React, { memo } from 'react';
import { Field, InjectedFormikProps } from 'formik';
import TextInput from 'app/components/Form/TextInput';
import { getFieldProps, getLocationFormatAddress, toNumber } from 'app/utils';
import { t } from 'app/i18n';
import ButtonForm from 'app/components/ButtonForm';
import MediaContents from 'app/components/MediaContents';
import InputTextarea from 'app/components/Form/InputTextarea';
import './styles.scss';
import Map from 'app/components/GoogleMap/map';
import AccessTypeSelect from '../AddPost/_components/AccessTypeSelectInput';
import { SearchLocationInput } from '../_components';
import CoordinateInput from '../_components/CoordinateInput';

interface IProps {
  history: any;
}

export type EnhancedProps = InjectedFormikProps<IProps, any>;

const FormLocation = (props: EnhancedProps) => {
  const {
    values,
    errors,
    handleSubmit,
    setFieldValue,
    touched,
    setValues,
  } = props;

  const { files, lat, lng } = values;

  const onChangeAddress = (newAddress: any) => {
    setValues({
      ...values,
      ...newAddress,
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <TextInput
            {...getFieldProps('name', props)}
            label={t('location.form.name')}
            required
          />

          <TextInput
            {...getFieldProps('country', props)}
            label={t('location.country')}
            required
          />
          <TextInput
            {...getFieldProps('city', props)}
            label={t('location.city')}
            required
          />
          <TextInput
            {...getFieldProps('district', props)}
            label={t('location.district')}
            required
          />
          <TextInput
            {...getFieldProps('ward', props)}
            label={t('location.ward')}
            required
          />
          <TextInput
            {...getFieldProps('street', props)}
            label={t('location.street')}
          />
          <TextInput
            {...getFieldProps('number', props)}
            label={t('location.number')}
          />
          <label>{t('location.address')}</label>
          <textarea
            className="w-full p-3 border bg-gray-200 overflow-hidden resize-none"
            rows={6}
            disabled
            value={getLocationFormatAddress(values)}
          />
        </div>
        <div className="mt-2">
          <SearchLocationInput onSelectLocation={onChangeAddress} />
          <CoordinateInput
            onChangeAddress={onChangeAddress}
            lat={lat}
            lng={lng}
          />
          <Map
            center={{
              lat: toNumber(lat),
              lng: toNumber(lng),
            }}
            isGetAddressFromCoordinates={false}
            onChangePlace={onChangeAddress}
          />

          <div>
            <div className="py-10">
              <label className="text-xl text-gray-600">
                {t('location.ranking')}*
                <span className="italic text-base px-2">
                  {t('location.note_ranking')}
                </span>
              </label>
              <div className="relative uto-box-range flex items-center justify-center mb-1 w-7/12">
                <Field
                  className="range"
                  type="range"
                  name="averagePoint"
                  value={values?.averagePoint}
                />
                <span
                  className={`absolute font-semibold text-lg cursor-pointer ${
                    Number(values?.averagePoint) > 50
                      ? 'text-white'
                      : 'text-black'
                  } transition-all duration-300 ease-in-out`}
                >
                  {`${values?.averagePoint}%`}
                </span>
              </div>
              {touched?.averagePoint && (
                <span className="w-full text-base text-red-500">
                  {errors?.averagePoint}
                </span>
              )}
              <div className="mt-4">
                <label className="text-default text-xl font-medium">
                  {t('location.add.duplicate_location')}
                </label>
                <div>{''}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-8">
        <span className="font-semibold text-2xl text-default">
          {t('add.post')}
        </span>
        <div className="grid grid-cols-2 gap-10">
          <div className="mt-4">
            <AccessTypeSelect {...getFieldProps('accessType', props)} />
            <InputTextarea
              rows={6}
              {...getFieldProps('content', props)}
              label={t('post.detail.content')}
            />
          </div>
          <div className="mt-4">
            <MediaContents
              data={files}
              onChangeMedia={(newFiles: any) =>
                setFieldValue('files', newFiles)
              }
              errMessage={errors?.files}
              touched={!!touched?.files}
            />
          </div>
        </div>
      </div>
      <div className="text-right">
        <ButtonForm
          onSubmit={handleSubmit}
          submitLabel={t('button.submit')}
          cancelLabel={t('button.cancel')}
        />
      </div>
    </>
  );
};

export default memo(FormLocation);
