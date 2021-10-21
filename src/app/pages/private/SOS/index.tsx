import React from 'react';
import TabComponent from 'app/components/Tabs';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { Route, Switch } from 'react-router-dom';

import DetailSos from 'app/pages/private/SOS/Sos/Detail/DetailSos.page';
import ForumList from './Forum/Forum.page';
import SosList from './Sos/List/ListSos.page';

const getRouter = () => [
  {
    key: [ROUTERS.SOS_LIST, ROUTERS.SOS_DETAIL],
    path: ROUTERS.SOS_LIST,
    title: t('sos.title'),
  },
  {
    key: [ROUTERS.FORUM_LIST],
    path: ROUTERS.FORUM_LIST,
    title: t('forum.title'),
  },
];

const SosTabsView = () => {
  return (
    <TabComponent routes={getRouter()}>
      <Switch>
        <Route path={ROUTERS.SOS_LIST} component={SosList} />
        <Route path={ROUTERS.FORUM_LIST} component={ForumList} />
        <Route path={ROUTERS.SOS_DETAIL} component={DetailSos} />
      </Switch>
    </TabComponent>
  );
};

export default SosTabsView;
