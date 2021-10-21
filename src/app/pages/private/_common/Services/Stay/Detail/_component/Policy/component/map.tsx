import React from 'react';
import GoogleMap from 'app/components/GoogleMap/map';
import { t } from 'app/i18n';
import { LableStyle } from '../styled';

const Map = ({ latitude, longitude }: any) => {
  const newCoor = { lat: latitude, lng: longitude };
  return (
    <div className="mb-2">
      <LableStyle>{t('APP.STAY.MAP')}</LableStyle>
      <GoogleMap
        center={newCoor}
        height="400px"
        zoom={15}
        style={{ width: '100%' }}
        options={{
          scrollwheel: false,
          draggable: false,
          disableDoubleClickZoom: true,
          zoomControl: false,
        }}
      />
    </div>
  );
};

export default Map;
