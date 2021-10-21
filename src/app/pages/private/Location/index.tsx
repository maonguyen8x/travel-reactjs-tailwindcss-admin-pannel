import React from 'react';
import TabComponent from 'app/components/Tabs';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { Route, Switch } from 'react-router-dom';
import LocationDetail from 'app/pages/private/Location/Attractions/DetailLocation/DetailLocation.page';
import LocationEdit from 'app/pages/private/Location/Attractions/EditLocation/EditLocation.page';
import LocationView from 'app/pages/private/Location/Attractions/ListLocation/ListLocation.page';
import SystemLocation from 'app/pages/private/Location/SystemLocation/ListLocation/ListLocation.page';
import LocationDuplicateView from 'app/pages/private/Location/DuplicateLocation/DupLocation.page';
import LocationChangeRequestView from 'app/pages/private/Location/RequestChangeLocation/ListRequestChangeLocation/RequestChangeLocation.page';
import DetailRequestChangeLocation from 'app/pages/private/Location/RequestChangeLocation/DetailRequestChangeLocation/DetailRequestChangeLocation.page';

const getRouter = () => [
  {
    key: [
      ROUTERS.LIST_LOCATION,
      ROUTERS.LOCATION_DETAIL,
      ROUTERS.LOCATION_EDIT,
    ],
    path: ROUTERS.LIST_LOCATION,
    title: t('location.d.title'),
  },
  {
    key: [
      ROUTERS.LIST_SYSTEM_LOCATION,
      ROUTERS.LOCATION_SYSTEM_DETAIL,
      ROUTERS.LOCATION_SYSTEM_EDIT,
    ],
    path: ROUTERS.LIST_SYSTEM_LOCATION,
    title: t('location.system_location.title'),
  },
  {
    key: [
      ROUTERS.LIST_REQUEST_CHANGE_LOCATION,
      ROUTERS.DETAIL_REQUEST_CHANGE_LOCATION,
    ],
    path: ROUTERS.LIST_REQUEST_CHANGE_LOCATION,
    title: t('change_location.title'),
  },
  {
    key: [ROUTERS.LOCATION_DUPLICATE],
    path: ROUTERS.LOCATION_DUPLICATE,
    title: t('location.duplicate_title'),
  },
];

const LocationTabs = () => {
  return (
    <TabComponent routes={getRouter()}>
      <Switch>
        <Route exact path={ROUTERS.LIST_LOCATION} component={LocationView} />
        <Route
          exact
          path={ROUTERS.LIST_SYSTEM_LOCATION}
          component={SystemLocation}
        />
        <Route
          exact
          path={ROUTERS.LIST_REQUEST_CHANGE_LOCATION}
          component={LocationChangeRequestView}
        />
        <Route
          path={ROUTERS.LOCATION_DUPLICATE}
          component={LocationDuplicateView}
        />
        <Route path={ROUTERS.LOCATION_DETAIL} component={LocationDetail} />
        <Route path={ROUTERS.LOCATION_EDIT} component={LocationEdit} />
        <Route
          path={ROUTERS.LOCATION_SYSTEM_DETAIL}
          component={LocationDetail}
        />
        <Route path={ROUTERS.LOCATION_SYSTEM_EDIT} component={LocationEdit} />
        <Route
          path={ROUTERS.DETAIL_REQUEST_CHANGE_LOCATION}
          component={DetailRequestChangeLocation}
        />
      </Switch>
    </TabComponent>
  );
};

export default LocationTabs;
