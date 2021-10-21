import React from 'react';
import { Field, InjectedFormikProps } from 'formik';
import TextInput from 'app/components/Form/TextInput';
import {
  getFieldProps,
  getFieldAddressProps,
  getLocationFormatAddress,
  toNumber,
} from 'app/utils';
import { t } from 'app/i18n';
import AddressInput from 'app/components/GoogleMap';
import ButtonForm from 'app/components/ButtonForm';
import 'app/pages/private/CreateNew/AddLocation/styles.scss';
import Map from 'app/components/GoogleMap/map';
import { getGeocodeCoordinates } from 'app/components/GoogleMap/utils';

interface IProps {
  props: EnhancedProps;
  fetching: boolean;
  locationDetail: any;
  isWhere: boolean;
}

export type EnhancedProps = InjectedFormikProps<IProps, any>;
let timeoutId: any = 0;

const FormLocation = (props: EnhancedProps) => {
  const {
    values,
    errors,
    fetching,
    handleSubmit,
    setValues,
    locationDetail,
    isWhere,
    touched,
  } = props;

  const onChangeAddress = (location: any) => {
    setValues({
      ...values,
      street: location?.route,
      number: location?.street,
      ward: location?.ward,
      district: location?.district,
      city: location?.city,
      country: location?.country,
      lng: location?.lng,
      lat: location?.lat,
    });
  };

  const onChangeCoordinate = (lat?: string | null, lng?: string | null) => {
    const coordinates = {
      lat: toNumber(lat) || values.lat,
      lng: toNumber(lng) || values.lng,
    };

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setValues({
      ...values,
      ...coordinates,
    });

    timeoutId = setTimeout(async () => {
      const result = await getGeocodeCoordinates(coordinates);

      setValues({
        ...values,
        ...result,
      });
    }, 2000);
  };

  if (!locationDetail) return null;

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
            className="w-full p-3 border bg-gray-300 overflow-hidden resize-none"
            rows={6}
            disabled
            value={getLocationFormatAddress(values)}
          />
        </div>
        <div className="mt-2">
          <AddressInput
            {...getFieldAddressProps('location', props)}
            label={t('location.search')}
            onChange={onChangeAddress}
          />
          <div className="-mt-2 mb-2">
            <div className="grid grid-cols-3 gap-10">
              <div>
                <TextInput
                  {...getFieldProps('lat', props)}
                  label={t('location.coordinate')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeCoordinate(e.target.value)
                  }
                  required
                />
              </div>
              <div className="">
                <TextInput
                  {...getFieldProps('lng', props)}
                  label="&emsp;"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeCoordinate(null, e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <Map
            center={{ lat: toNumber(values.lat), lng: toNumber(values.lng) }}
            onChangePlace={onChangeAddress}
          />

          <div>
            <div className="py-10">
              {isWhere && (
                <>
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
                </>
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
      <div>
        <ButtonForm
          onSubmit={handleSubmit}
          submitLabel={t('button.submit')}
          cancelLabel={t('button.cancel')}
          isLoading={fetching}
        />
      </div>
    </>
  );
};

export default FormLocation;
