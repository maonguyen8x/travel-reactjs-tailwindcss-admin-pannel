import React from 'react';
import { t } from 'app/i18n';
import Rules from './component/rules';
import CancellationLocation from './component/cancellationpolicy';
import Map from './component/map';
import ServiceLocations from './component/servicelocations';

const Policy = ({ data }: any) => (
  <>
    <Rules rules={data?.rules} />
    <CancellationLocation label={t('APP.STAY.CANCELLATION_POLICY')} />
    <Map
      latitude={data?.page?.location?.latitude}
      longitude={data?.page?.location?.longitude}
    />
    <ServiceLocations services={data?.page?.generalInformation?.stay} />
  </>
);

export default Policy;
