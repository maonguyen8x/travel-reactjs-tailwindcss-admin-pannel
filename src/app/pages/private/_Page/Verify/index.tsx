import React from 'react';
import TabComponent from 'app/components/Tabs';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { Route, Switch } from 'react-router-dom';
import ListVerify from 'app/pages/private/_Page/Verify/List/ListAccount.page';
import VerifyDetail from 'app/pages/private/_Page/Verify/Detail/DetailAccount.page';

const getRouter = () => [
  {
    key: [ROUTERS.LIST_VERIFY_ACCOUNT, ROUTERS.VERIFY_ACCOUNT_DETAIL],
    path: ROUTERS.LIST_VERIFY_ACCOUNT,
    title: t('verify.title'),
  },
];

const VerifyPortal = () => {
  return (
    <TabComponent routes={getRouter()}>
      <Switch>
        <Route
          exact
          path={ROUTERS.LIST_VERIFY_ACCOUNT}
          component={ListVerify}
        />
        <Route path={ROUTERS.VERIFY_ACCOUNT_DETAIL} component={VerifyDetail} />
      </Switch>
    </TabComponent>
  );
};

export default VerifyPortal;
