import React, { memo } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';

import Geocode from 'react-geocode';
import { GOOGLE } from 'app/constants';
import { compose, withProps } from 'recompose';
import { IMap } from './type';
import { getGeocodeCoordinates } from './utils';

Geocode.setApiKey(GOOGLE.KEY);

// TODO: Need @Long update

const Map = (props: IMap) => {
  const {
    center,
    draggable = true,
    zoom = 15,
    options,
    onChangePlace,
    height = '400px',
    isGetAddressFromCoordinates = true,
  } = props;

  const onMarkerDragEnd = async (event: any) => {
    const lat = event?.latLng?.lat();
    const lng = event?.latLng?.lng();
    if (isGetAddressFromCoordinates) {
      const result = await getGeocodeCoordinates({ lat, lng });

      onChangePlace(result);
      return;
    }
    onChangePlace({
      lat,
      lng,
    });
  };

  if (center && center?.lat && center?.lng) {
    return (
      <div>
        <AsyncMap
          defaultZoom={zoom}
          coordinates={center}
          options={options}
          draggable={draggable}
          onMarkerDragEnd={onMarkerDragEnd}
          height={height}
        />
      </div>
    );
  }

  return null;
};

const AsyncMap = compose<any, any>(
  withProps(({ height }: any) => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE.KEY}&libraries=places`,
    loadingElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height }} />,
  })),
  withScriptjs,
  withGoogleMap
)(({ defaultZoom, coordinates, options, draggable, onMarkerDragEnd }: any) => (
  <GoogleMap
    defaultZoom={defaultZoom}
    defaultCenter={coordinates}
    center={coordinates}
    options={options}
  >
    <Marker
      draggable={draggable}
      position={coordinates}
      onDragEnd={onMarkerDragEnd}
    />
  </GoogleMap>
));

export default memo(Map);
