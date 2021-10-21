import React, { useCallback, useEffect } from 'react';
import Map from 'app/components/GoogleMap/map';
import NormalInput from 'app/components/Form/NormalInput';
import { t } from 'app/i18n';
import { STATUS_CHANGE_LOCATION_TYPES } from 'app/constants';
import {
  DATA_NEW_LOCATION,
  DATA_CURRENT_LOCATION,
} from './DetailRequestChangeLocation.utils';

const RequestChangeLocationDetail = (props: any) => {
  const {
    requestChangeLocationDetail,
    getRequestChangeLocationById,
    match,
    ON_CANCEL_REQUEST_LOCATION,
    ON_CONFIRM_REQUEST_LOCATION,
  } = props;
  const id = match?.params?.id;

  const currentCoordinates = {
    lat: Number(
      requestChangeLocationDetail?.location?.coordinates?.split(',')?.[0]
    ),
    lng: Number(
      requestChangeLocationDetail?.location?.coordinates?.split(',')?.[1]
    ),
  };

  const newCoordinates = {
    lat: Number(requestChangeLocationDetail?.coordinates?.split(',')?.[0]),
    lng: Number(requestChangeLocationDetail?.coordinates?.split(',')?.[1]),
  };

  useEffect(() => {
    getRequestChangeLocationById(id);
  }, [id]);

  const renderCurrentMap = useCallback(() => {
    return (
      <Map
        center={currentCoordinates}
        draggable={false}
        height="440px"
        zoom={15}
        options={{
          scrollwheel: false,
          draggable: false,
          disableDoubleClickZoom: true,
          zoomControl: false,
          clickableIcons: false,
        }}
      />
    );
  }, [
    requestChangeLocationDetail?.location?.latitude,
    requestChangeLocationDetail?.location?.longitude,
  ]);

  const renderNewMap = useCallback(() => {
    return (
      <Map
        center={newCoordinates}
        draggable={false}
        height="440px"
        zoom={15}
        options={{
          scrollwheel: false,
          draggable: false,
          disableDoubleClickZoom: true,
          zoomControl: false,
          clickableIcons: false,
        }}
      />
    );
  }, [requestChangeLocationDetail?.coordinates]);

  const renderNewLocation = useCallback(() => {
    return (
      <>
        {DATA_NEW_LOCATION(requestChangeLocationDetail)?.map((items: any) => (
          <NormalInput
            className={items?.changed}
            value={items?.value}
            label={items?.label}
            disabled
          />
        ))}
      </>
    );
  }, [requestChangeLocationDetail]);

  const renderCurrentLocation = useCallback(() => {
    return (
      <>
        {DATA_CURRENT_LOCATION(requestChangeLocationDetail)?.map(
          (items: any) => (
            <NormalInput value={items?.value} label={items?.label} disabled />
          )
        )}
      </>
    );
  }, [requestChangeLocationDetail]);

  return (
    <div className="grid grid-cols-2 gap-10">
      <div>
        <span className="text-red-500 text-2xl font-semibold block">
          <label>{t('change_location.new')}</label>
        </span>
        {renderNewLocation()}
        <div
          className={`mt-10 ${
            !(
              currentCoordinates?.lat === newCoordinates?.lat &&
              currentCoordinates?.lng === newCoordinates?.lng
            ) && 'border-2 border-red-500'
          }`}
        >
          {renderNewMap()}
        </div>
      </div>

      <div>
        <span className="text-gray-600 text-2xl font-semibold block">
          <label>{t('change_location.current')}</label>
        </span>
        {renderCurrentLocation()}
        <div className="mt-10 border-2 border-transparent">
          {renderCurrentMap()}
        </div>
      </div>
      {requestChangeLocationDetail?.status ===
        STATUS_CHANGE_LOCATION_TYPES.REQUESTED && (
        <div className="flex flex-row space-x-5 ">
          <button
            className="bg-green-500 px-8 py-3 text-xl font-medium text-white rounded-md"
            onClick={ON_CONFIRM_REQUEST_LOCATION}
          >
            {t('button.agree')}
          </button>
          <button
            className="bg-yellow-500 px-8 py-3 text-xl font-medium text-white rounded-md"
            onClick={ON_CANCEL_REQUEST_LOCATION}
          >
            {t('button.cancel_request')}
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestChangeLocationDetail;
