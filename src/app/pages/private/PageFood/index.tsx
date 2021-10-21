import React from 'react';
import TabComponent from 'app/components/Tabs';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { Route, Switch } from 'react-router-dom';
import ListFood from 'app/pages/private/PageFood/ListPageFood/ListFood.page';
import FoodDetail from 'app/pages/private/PageFood/Services/Food/DetailFood/DetailFood.page';
import ListFoodService from 'app/pages/private/PageFood/Services/Food/ListFoodService/ListFoodService.page';
import FoodServiceDetail from 'app/pages/private/PageFood/Services/Food/DetailFoodService/DetailFoodService.page';
import AuthenticationPageFood from 'app/pages/private/PageFood/Services/Food/DetailFood/AuthenticationPage/AuthenticationPage.page';

const getRouter = () => [
  {
    key: [
      ROUTERS.LIST_FOOD,
      ROUTERS.FOOD_DETAIL,
      ROUTERS.LIST_FOOD_SERVICE,
      ROUTERS.TOUR_LIST_BOOKING,
      ROUTERS.SERVICE_FOOD_DETAIL,
      ROUTERS.FOOD_AUTHENTICATION_PAGE,
    ],
    path: ROUTERS.LIST_FOOD,
    title: t('food.title'),
  },
];

const UserPortal = () => {
  return (
    <TabComponent routes={getRouter()}>
      <Switch>
        <Route path={ROUTERS.LIST_FOOD} component={ListFood} />
        <Route path={ROUTERS.FOOD_DETAIL} component={FoodDetail} />
        <Route path={ROUTERS.LIST_FOOD_SERVICE} component={ListFoodService} />
        <Route
          path={ROUTERS.SERVICE_FOOD_DETAIL}
          component={FoodServiceDetail}
        />
        <Route
          path={ROUTERS.FOOD_AUTHENTICATION_PAGE}
          component={AuthenticationPageFood}
        />
      </Switch>
    </TabComponent>
  );
};

export default UserPortal;
