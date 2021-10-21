import React from 'react';
import TabComponent from 'app/components/Tabs';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { Route, Switch } from 'react-router-dom';
import UserDetail from 'app/pages/private/User/Detail/DetailUser.page';
import ListUserBlocked from 'app/pages/private/User/ListUserBlocked/ListUserBlocked.page';
import ListUser from 'app/pages/private/User/List/ListUser.page';
import ChangeRoles from 'app/pages/private/User/ChangeRoles/ChangeRole.page';

const getRouter = () => [
  {
    key: [ROUTERS.LIST_USER, ROUTERS.USER_DETAIL],
    path: ROUTERS.LIST_USER,
    title: t('user.d.title'),
  },
  {
    key: [ROUTERS.LIST_ACCOUNT_BLOCKED],
    path: ROUTERS.LIST_ACCOUNT_BLOCKED,
    title: t('user.blocked.accounts'),
  },
];

const UserPortal = () => {
  return (
    <TabComponent routes={getRouter()}>
      <Switch>
        <Route path={ROUTERS.LIST_USER} component={ListUser} />
        <Route
          path={ROUTERS.LIST_ACCOUNT_BLOCKED}
          component={ListUserBlocked}
        />
        <Route path={ROUTERS.USER_DETAIL} component={UserDetail} />
        <Route path={ROUTERS.CHANGE_ROLES} component={ChangeRoles} />
      </Switch>
    </TabComponent>
  );
};

export default UserPortal;
