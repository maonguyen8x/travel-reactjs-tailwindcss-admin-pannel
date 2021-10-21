import React from 'react';
import { InjectedFormikProps } from 'formik';
import {
  TextInput,
  ButtonForm,
  InputTextarea,
  MediaContents,
  Map,
} from 'app/components';
import { getFieldProps } from 'app/utils';
import { t } from 'app/i18n';
import { IProps, IValues } from './AddActivity.type';
import { SearchLocationInput } from '../_components';

export type EnhancedProps = InjectedFormikProps<IProps, IValues>;

const FormLocation = (props: EnhancedProps) => {
  const { values, setValues, handleSubmit, setFieldValue } = props;
  const { files, lat, lng } = values;

  const onSelectLocation = (location: any) => {
    setValues({
      ...values,
      ...location,
    });
  };

  const onChangeMedia = (newFiles: string) => {
    setFieldValue('files', newFiles);
  };

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-10 w-full">
        <div className="">
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-2">
              <TextInput
                {...getFieldProps('name', props)}
                label={t('activity.name')}
                maxLength={80}
              />
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-10">
              <TextInput
                type="date"
                {...getFieldProps('startDate', props)}
                label={t('activity.startDate')}
              />
              <TextInput
                type="time"
                {...getFieldProps('fromHour', props)}
                label="&emsp;"
              />
              <TextInput
                type="date"
                {...getFieldProps('endDate', props)}
                label={t('activity.endDate')}
              />
              <TextInput
                type="time"
                {...getFieldProps('toHour', props)}
                label="&emsp;"
              />
              <div className="col-span-2">
                <TextInput
                  type="number"
                  {...getFieldProps('price', props)}
                  label={t('activity.price')}
                  addon={
                    <button
                      className="bg-default flex items-center justify-center text-white h-full w-20 text-xl uppercase"
                      disabled
                    >
                      {'vnđ'}
                    </button>
                  }
                />
              </div>
              <div className="col-span-2">
                <InputTextarea
                  {...getFieldProps('introduce', props)}
                  label={t('activity.introduce')}
                  rows={15}
                  maxLength={500}
                />
              </div>
              <div className="col-span-2">
                <MediaContents
                  data={files}
                  onChangeMedia={onChangeMedia}
                  {...getFieldProps('files', props)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-2 mt-2">
              <SearchLocationInput
                onSelectLocation={onSelectLocation}
                {...getFieldProps('locationId', props)}
              />
            </div>
            <div className="col-span-2">
              <div className="mb-10">
                <Map
                  center={{
                    lat: lat,
                    lng: lng,
                  }}
                  draggable={false}
                  height="250px"
                />
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-10">
                <TextInput
                  disabled
                  {...getFieldProps('lat', props)}
                  label={t('location.coordinate')}
                />
                <TextInput
                  disabled
                  {...getFieldProps('lng', props)}
                  label="&emsp;"
                />
                <TextInput
                  disabled
                  {...getFieldProps('country', props)}
                  label={t('location.country')}
                />
                <TextInput
                  disabled
                  {...getFieldProps('ward', props)}
                  label={t('location.ward')}
                />
                <TextInput
                  disabled
                  {...getFieldProps('city', props)}
                  label={t('location.city')}
                />
                <TextInput
                  disabled
                  {...getFieldProps('street', props)}
                  label={t('location.street')}
                />
                <TextInput
                  disabled
                  {...getFieldProps('district', props)}
                  label={t('location.district')}
                />
                <TextInput
                  disabled
                  {...getFieldProps('number', props)}
                  label={t('location.number')}
                />
                <TextInput
                  disabled
                  {...getFieldProps('address', props)}
                  label={t('location.address')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ButtonForm
        onSubmit={handleSubmit}
        submitLabel={t('button.submit')}
        cancelLabel={t('button.cancel')}
      />
    </div>
  );
};

export default FormLocation;
