import React from 'react';
import { InjectedFormikProps } from 'formik';
import { t } from 'app/i18n';
import { getFieldProps, getLocationFormatAddress } from 'app/utils';
import { TextInput, ButtonForm, InputTextarea, Map } from 'app/components';
import CropImage from 'app/components/CropImage';
import { IProps } from './EditActivities.type';
import { SearchLocationInput } from '../../CreateNew/_components';

export type EnhancedProps = InjectedFormikProps<IProps, any>;

const EditActivities = (props: EnhancedProps) => {
  const { values, setValues, setFieldValue, handleSubmit, isLoading } = props;

  const onSelectLocation = (location: any) => {
    setValues({
      ...values,
      ...location,
    });
  };

  return (
    <>
      <div className="">
        <div className="grid grid-cols-2 gap-10 w-full">
          <div className="">
            <div className="grid grid-cols-2 gap-10">
              <div className="col-span-2">
                <TextInput
                  {...getFieldProps('name', props)}
                  label={t('activity.name')}
                  required
                />
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-10">
                <TextInput
                  type="date"
                  {...getFieldProps('startDay', props)}
                  label={t('activity.startDate')}
                />
                <TextInput
                  type="time"
                  {...getFieldProps('fromHour', props)}
                  label="&emsp;"
                />
                <TextInput
                  type="date"
                  {...getFieldProps('endDay', props)}
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
                    {...getFieldProps('introduction', props)}
                    label={t('activity.introduce')}
                    rows={15}
                  />
                </div>
                <div className="col-span-2">
                  <CropImage
                    onChangeMedia={(newFiles: any) => {
                      setFieldValue('files', newFiles);
                    }}
                    {...getFieldProps('files', props)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="grid grid-cols-2 gap-10">
              <div className="col-span-2 mt-2">
                <SearchLocationInput onSelectLocation={onSelectLocation} />
              </div>
              <div className="col-span-2">
                <div className="mb-10">
                  <Map
                    center={{
                      lat: values?.lat,
                      lng: values?.lng,
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
                    {...getFieldProps('country', props)}
                    label={t('location.country')}
                    required
                  />
                  <TextInput
                    {...getFieldProps('ward', props)}
                    label={t('location.ward')}
                    required
                  />
                  <TextInput
                    {...getFieldProps('city', props)}
                    label={t('location.city')}
                    required
                  />
                  <TextInput
                    {...getFieldProps('street', props)}
                    label={t('location.street')}
                  />
                  <TextInput
                    {...getFieldProps('district', props)}
                    label={t('location.district')}
                    required
                  />
                  <TextInput
                    {...getFieldProps('number', props)}
                    label={t('location.number')}
                  />
                </div>
                <label>{t('location.address')}</label>
                <textarea
                  className="w-full p-3 border bg-gray-300 overflow-hidden resize-none"
                  rows={6}
                  disabled
                  value={getLocationFormatAddress(values)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <ButtonForm
            onSubmit={handleSubmit}
            submitLabel={t('button.submit')}
            cancelLabel={t('button.cancel')}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default EditActivities;
