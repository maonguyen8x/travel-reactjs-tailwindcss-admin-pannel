import React from 'react';
import TabComponent from 'app/components/Tabs';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { Route, Switch } from 'react-router-dom';
import PostDetail from 'app/pages/private/Post/DetailPost/DetailPost.page';
import PostEdit from 'app/pages/private/Post/EditPost/EditPost.page';
import ListPost from 'app/pages/private/Post/ListPost/ListPost.page';

const getRouter = () => [
  {
    key: [ROUTERS.LIST_POST, ROUTERS.POST_DETAIL, ROUTERS.POST_EDIT],
    path: ROUTERS.LIST_POST,
    title: t('post.title'),
  },
];

const UserPortal = () => {
  return (
    <TabComponent routes={getRouter()}>
      <Switch>
        <Route path={ROUTERS.LIST_POST} component={ListPost} />
        <Route path={ROUTERS.POST_DETAIL} component={PostDetail} />
        <Route path={ROUTERS.POST_EDIT} component={PostEdit} />
      </Switch>
    </TabComponent>
  );
};

export default UserPortal;
