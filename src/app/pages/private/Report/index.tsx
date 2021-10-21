import React from 'react';
import TabComponent from 'app/components/Tabs';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { Route, Switch } from 'react-router-dom';
import ReportDetail from 'app/pages/private/Report/Detail/DetailReport.page';
import ListReport from 'app/pages/private/Report/List/ListReport.page';

const getRouter = () => [
  {
    key: [ROUTERS.LIST_REPORT, ROUTERS.REPORT_DETAIL],
    path: ROUTERS.LIST_REPORT,
    title: t('report.title'),
  },
];

const UserPortal = () => {
  return (
    <TabComponent routes={getRouter()}>
      <Switch>
        <Route path={ROUTERS.LIST_REPORT} component={ListReport} />
        <Route path={ROUTERS.REPORT_DETAIL} component={ReportDetail} />
      </Switch>
    </TabComponent>
  );
};

export default UserPortal;
