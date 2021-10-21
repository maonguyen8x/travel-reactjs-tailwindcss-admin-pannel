import React from 'react';
import TabComponent from 'app/components/Tabs';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { Route, Switch } from 'react-router-dom';
import ListActivity from 'app/pages/private/Activity/List/ListActivities.page';
import ActivityDetail from 'app/pages/private/Activity/Detail/DetailActivities.page';
import ActivityEdit from 'app/pages/private/Activity/Edit/EditActivities.page';

const getRouter = () => [
  {
    key: [
      ROUTERS.LIST_ACTIVITY,
      ROUTERS.ACTIVITY_DETAIL,
      ROUTERS.ACTIVITY_PARTICIPANTS,
      ROUTERS.EDIT_ACTIVITY,
    ],
    path: ROUTERS.LIST_ACTIVITY,
    title: t('activity.title'),
  },
];

const UserPortal = () => {
  return (
    <TabComponent routes={getRouter()}>
      <Switch>
        <Route path={ROUTERS.ACTIVITY_DETAIL} component={ActivityDetail} />
        <Route path={ROUTERS.LIST_ACTIVITY} component={ListActivity} />
        <Route path={ROUTERS.EDIT_ACTIVITY} component={ActivityEdit} />
      </Switch>
    </TabComponent>
  );
};

export default UserPortal;
