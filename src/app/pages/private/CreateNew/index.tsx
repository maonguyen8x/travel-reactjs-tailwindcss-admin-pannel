import React from 'react';
import TabComponent from 'app/components/Tabs';
import { Route, Switch } from 'react-router-dom';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import PostAdd from 'app/pages/private/CreateNew/AddPost/AddPost.page';
import LocationAdd from 'app/pages/private/CreateNew/AddLocation/AddLocation.page';
import FoodAdd from 'app/pages/private/PageFood/Services/Food/AddPageFood/AddFood.page';
import TourAdd from 'app/pages/private/PageTour/Services/Tour/AddPageTour/AddTour.page';
import ActivityAdd from 'app/pages/private/CreateNew/AddActivity/AddActivity.page';

export const getRouter = () => [
  { key: [ROUTERS.POST_ADD], path: ROUTERS.POST_ADD, title: t('admin.post') },
  {
    key: [ROUTERS.LOCATION_ADD],
    path: ROUTERS.LOCATION_ADD,
    title: t('admin.place'),
  },
  { key: [ROUTERS.FOOD_ADD], path: ROUTERS.FOOD_ADD, title: t('admin.food') },
  { key: [ROUTERS.TOUR_ADD], path: ROUTERS.TOUR_ADD, title: t('admin.tour') },
  {
    key: [ROUTERS.CREATE_NEW_ACTIVITY],
    path: ROUTERS.CREATE_NEW_ACTIVITY,
    title: t('admin.activity'),
  },
  { key: ['stay'], path: undefined, title: t('admin.stay') },
];

const AdminCreate = () => {
  return (
    <TabComponent routes={getRouter()}>
      <Switch>
        <Route path={ROUTERS.POST_ADD} component={PostAdd} />
        <Route path={ROUTERS.LOCATION_ADD} component={LocationAdd} />
        <Route path={ROUTERS.FOOD_ADD} component={FoodAdd} />
        <Route path={ROUTERS.TOUR_ADD} component={TourAdd} />
        <Route path={ROUTERS.CREATE_NEW_ACTIVITY} component={ActivityAdd} />
      </Switch>
    </TabComponent>
  );
};

export default AdminCreate;
