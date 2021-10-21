import React from 'react';
import TabComponent from 'app/components/Tabs';
import FeedbackView from 'app/pages/private/System/Feedback/List/ListFeedback.page';
import FeedbackChatRoom from 'app/pages/private/System/Feedback/ChatRoom/ChatRoom.view';
import BackgroundView from 'app/pages/private/System/BackgroundPost/ListBackgroundPost/ListBackgroundPost.page';
import MessageView from 'app/pages/private/System/Messenger/ListMessenger/ListMessenger.page';
import SecurityView from 'app/pages/private/System/Security/Security.page';
import IntegrationConfigurationView from 'app/pages/private/System/IntegrationConfig/IntegrationConfig.page';
import { ROUTERS, USER_ROLES } from 'app/constants';
import { t } from 'app/i18n';
import { Route, Switch } from 'react-router-dom';
import FeedbackDetail from 'app/pages/private/System/Feedback/Detail/DetailFeedback.page';
import MessengerAdd from 'app/pages/private/System/Messenger/AddMessenger/AddMessenger.page';
import MessengerEdit from 'app/pages/private/System/Messenger/EditMessenger/EditMessenger.page';
import AuditView from 'app/pages/private/System/Audit/Audit.page';
import AddBackgroundPost from 'app/pages/private/System/BackgroundPost/AddBackgroundPost/AddBackgroundPost.page';
import EditBackgroundPost from 'app/pages/private/System/BackgroundPost/EditBackgroundPost/EditBackgroundPost.page';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Alert } from 'reactstrap';

const getRouter = (role: string) => [
  {
    key: [
      ROUTERS.LIST_FEEDBACK,
      ROUTERS.FEEDBACK_DETAIL,
      ROUTERS.FEEDBACK_CHAT_ROOM,
    ],
    path: ROUTERS.LIST_FEEDBACK,
    title: t('admin.feedback'),
  },
  {
    key: [
      ROUTERS.LIST_MESSENGER,
      ROUTERS.MESSENGER_ADD,
      ROUTERS.MESSENGER_EDIT,
    ],
    path: ROUTERS.LIST_MESSENGER,
    title: t('admin.message'),
  },
  {
    key: [ROUTERS.LIST_BACKGROUND_POST],
    path: ROUTERS.LIST_BACKGROUND_POST,
    title: t('admin.background'),
  },
  {
    key: [ROUTERS.ADMIN_SECURITY],
    path: ROUTERS.ADMIN_SECURITY,
    title: t('admin.security'),
  },
  {
    key: [ROUTERS.ADMIN_INTEGRATION_CONFIGURATION],
    path: ROUTERS.ADMIN_INTEGRATION_CONFIGURATION,
    title: t('admin.integration.configuration'),
  },
  {
    key: [ROUTERS.ADMIN_AUDIT],
    path: role === USER_ROLES.ADMIN ? ROUTERS.ADMIN_AUDIT : undefined,
    title: t('admin.audit'),
  },
];

const SystemAdmin = () => {
  const role = useSelector(
    (state: RootStateOrAny) => state?.auth?.profile?.roles
  );

  const PermissionRouter = (props: any) => {
    if (role !== USER_ROLES.ADMIN)
      return <Alert color="warning">{t('permissions_role')}</Alert>;
    return <Route {...props} />;
  };

  return (
    <TabComponent routes={getRouter(role)}>
      <Switch>
        <Route path={ROUTERS.LIST_FEEDBACK} component={FeedbackView} />
        <Route path={ROUTERS.FEEDBACK_CHAT_ROOM} component={FeedbackChatRoom} />
        <Route path={ROUTERS.FEEDBACK_DETAIL} component={FeedbackDetail} />
        <Route path={ROUTERS.LIST_BACKGROUND_POST} component={BackgroundView} />
        <Route path={ROUTERS.ADMIN_SECURITY} component={SecurityView} />

        <PermissionRouter path={ROUTERS.ADMIN_AUDIT} component={AuditView} />

        <Route
          path={ROUTERS.ADMIN_INTEGRATION_CONFIGURATION}
          component={IntegrationConfigurationView}
        />
        <Route
          path={ROUTERS.ADD_BACKGROUND_POST}
          component={AddBackgroundPost}
        />
        <Route
          path={ROUTERS.ADD_BACKGROUND_POST}
          component={EditBackgroundPost}
        />
        <Route path={ROUTERS.LIST_MESSENGER} component={MessageView} />
        <Route path={ROUTERS.MESSENGER_ADD} component={MessengerAdd} />
        <Route path={ROUTERS.MESSENGER_EDIT} component={MessengerEdit} />
      </Switch>
    </TabComponent>
  );
};

export default SystemAdmin;
