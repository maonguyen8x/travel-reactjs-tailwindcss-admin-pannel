import React from 'react';
import TabComponent from 'app/components/Tabs';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { Route, Switch } from 'react-router-dom';
import ListTour from 'app/pages/private/PageTour/ListPageTour/ListTour.page';
import TourDetail from 'app/pages/private/PageTour/Services/Tour/DetailTour/DetailTour.page';
import TourDetailProvider from 'app/pages/private/PageTour/Services/Tour/TourProvider/TourProvider.page';
import AuthenticationPageTour from 'app/pages/private/PageTour/Services/Tour/DetailTour/AuthenticationPage/AuthenticationPage.page';
import TourManagementBooking from 'app/pages/private/PageTour/Services/Tour/ManagementBooking/ManagementBooking.page';
import ListTourServices from 'app/pages/private/PageTour/Services/Tour/DetailTour/ListTour/ListTour.page';

const getRouter = () => [
  {
    key: [
      ROUTERS.LIST_TOUR,
      ROUTERS.TOUR_DETAIL,
      ROUTERS.TOUR_AUTHENTICATION_PAGE,
      ROUTERS.TOUR_LIST_BOOKING,
      ROUTERS.TOUR_DETAIL,
      ROUTERS.TOUR_DETAIL_PROVIDER,
    ],
    path: ROUTERS.LIST_TOUR,
    title: t('tour.title'),
  },
];

const UserPortal = () => {
  return (
    <TabComponent routes={getRouter()}>
      <Switch>
        <Route path={ROUTERS.LIST_TOUR} component={ListTour} />
        <Route path={ROUTERS.TOUR_DETAIL} component={TourDetail} />
        <Route
          path={ROUTERS.TOUR_DETAIL_PROVIDER}
          component={TourDetailProvider}
        />
        <Route
          path={ROUTERS.TOUR_AUTHENTICATION_PAGE}
          component={AuthenticationPageTour}
        />
        <Route
          path={ROUTERS.TOUR_LIST_BOOKING}
          component={TourManagementBooking}
        />
        <Route path={ROUTERS.TOUR_DETAIL} component={ListTourServices} />
      </Switch>
    </TabComponent>
  );
};

export default UserPortal;
