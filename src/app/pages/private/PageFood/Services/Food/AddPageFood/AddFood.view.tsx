import React, { useEffect, useState } from 'react';
import { InjectedFormikProps } from 'formik';
import TextInput from 'app/components/Form/TextInput';
import { getFieldProps, toNumber, getLocationFormatAddress } from 'app/utils';
import { t } from 'app/i18n';
import Map from 'app/components/GoogleMap/map';
import ButtonForm from 'app/components/ButtonForm';
import { getGeocodeCoordinates } from 'app/components/GoogleMap/utils';
import { getListLocationSearch } from 'app/pages/private/CreateNew/AddLocation/service';
import { STATISTIC_TYPE } from 'app/constants';
import AutoCompleted from 'app/components/AutoCompleted';

interface IProps {
  props: EnhancedProps;
}

export type EnhancedProps = InjectedFormikProps<IProps, any>;
let timeoutId: any = 0;

const FormFood = (props: EnhancedProps) => {
  const { values, setValues, handleSubmit } = props;

  const [state, setState] = useState({
    searchTxt: '',
    resultSearching: [],
  });

  const { searchTxt, resultSearching } = state;

  const onChangeSearchTxt = (value: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setState({
        ...state,
        searchTxt: value,
      });
    }, 300);
  };

  useEffect(() => {
    if (!!searchTxt) {
      (async () => {
        const result: any = await getListLocationSearch(searchTxt);
        setState({
          ...state,
          resultSearching: result?.data,
        });
      })();
    }
  }, [searchTxt]);

  const onChangeAddress = (location: any) => {
    setValues({
      ...values,
      country: location?.country,
      city: location?.areaLevel1,
      district: location?.areaLevel2,
      ward: location?.areaLevel3,
      street: location?.areaLevel4,
      number: location?.areaLevel5,
      address: location?.address,
      lng: location?.longitude,
      lat: location?.latitude,
      coordinates: location?.coordinates,
    });
  };

  const onChangeMarker = (location: any) => {
    setValues({
      ...values,
      ...location,
    });
  };

  const onChangeCoordinate = (lat?: string | null, lng?: string | null) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const coordinates = {
      lat: toNumber(lat) || values.lat,
      lng: toNumber(lng) || values.lng,
    };

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
    }, 500);
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1">
        <TextInput
          {...getFieldProps('name', props)}
          label={t('food.create.name')}
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
      <div className="col-span-2">
        <AutoCompleted
          label={t('location.search')}
          data={resultSearching}
          searchType={STATISTIC_TYPE.LOCATION}
          onChangeSearch={onChangeSearchTxt}
          getValueSearch={onChangeAddress}
        />
        <div className="grid grid-cols-2 gap-8 w-2/3">
          <div>
            <TextInput
              as="Col"
              md={6}
              {...getFieldProps('lat', props)}
              label={t('location.coordinate')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeCoordinate(e.target.value)
              }
              required
            />
          </div>
          <div>
            <TextInput
              as="Col"
              md={6}
              {...getFieldProps('lng', props)}
              label="&emsp;"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeCoordinate(null, e.target.value)
              }
            />
          </div>
        </div>
        <Map
          center={{
            lat: toNumber(values.lat),
            lng: toNumber(values.lng),
          }}
          onChangePlace={onChangeMarker}
        />
        <div className="grid grid-cols-2 gap-8 py-4">
          <div>
            <TextInput
              {...getFieldProps('phone', props)}
              label={t('food.phone')}
            />
          </div>
          <div>
            <TextInput
              {...getFieldProps('email', props)}
              label={t('food.email')}
            />
          </div>
        </div>
        <div>
          <span className="font-medium">{t('location.duplicate')}</span>
        </div>
        <div className="py-5">
          <ButtonForm
            onSubmit={handleSubmit}
            submitLabel={t('button.submit')}
            cancelLabel={t('button.cancel')}
          />
        </div>
      </div>
    </div>
  );
};

export default FormFood;
