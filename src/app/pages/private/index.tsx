import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ROUTERS, SCOPES_TYPES } from 'app/constants';
import { USER_ROLES } from 'app/constants/User.constants';

import { Alert } from 'reactstrap';
import { t } from 'app/i18n';

import UserPortal from 'app/pages/private/User';
import LocationPostal from 'app/pages/private/Location';
import CreateNewPostal from 'app/pages/private/CreateNew';
import SystemPostal from 'app/pages/private/System';

import PostPostal from 'app/pages/private/Post';
import PostDetail from 'app/pages/private/Post/DetailPost/DetailPost.page';

import ActivityPostal from 'app/pages/private/Activity';

// Tour
import TourPostal from 'app/pages/private/PageTour';

// Food
import FoodPostal from 'app/pages/private/PageFood';

// Report
import ReportPostal from 'app/pages/private/Report';

// SOS
import SOSPostal from 'app/pages/private/SOS';

// VERIFY

import VerifyPostal from 'app/pages/private/_Page/Verify';

// Plan
const ListPlan = lazy(
  () => import('app/pages/private/User/Plan/ListPlan/ListPlan.page')
);
const PlanDetail = lazy(
  () => import('app/pages/private/User/Plan/DetailPlan/DetailPlan.page')
);

// Profile

const Profile = lazy(
  () => import('app/pages/private/_Personal/Profile/List/ListProfile.page')
);
const ProfileUpdate = lazy(
  () => import('app/pages/private/_Personal/Profile/Update/UpdateUser.page')
);

const ListNotification = lazy(
  () =>
    import('app/pages/private/_common/Notification/List/ListNotification.page')
);

const DashboardPostal = lazy(() => import('./Dashboard/ListDashboard.page'));

const ListAdmin = lazy(
  () => import('app/pages/private/Admin/ListAdmin/ListAdmin.page')
);

const AdminAdd = lazy(
  () => import('app/pages/private/Admin/AddAdmin/AddAdmin.page')
);

export const PermissionRouter = (props: any) => {
  if (!props?.isPermission)
    return <Alert color="warning">{t('permissions_role')}</Alert>;
  return <Route {...props} />;
};

export default function HomePage({ role, scopes }: any) {
  const checkPermission = (scopeRequest?: string) => {
    if (role !== USER_ROLES.NORMAL_USER) return true;

    return scopes?.split(',')?.includes(scopeRequest);
  };
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Redirect exact from="/" to="/app/dashboard" />
        <Route exact path="/app/dashboard" component={DashboardPostal} />

        {/* User */}
        <PermissionRouter
          isPermission={checkPermission(SCOPES_TYPES.USER)}
          exact
          path={ROUTERS.USER_POSTAL}
          component={UserPortal}
        />

        {/* Location */}
        <PermissionRouter
          isPermission={checkPermission(SCOPES_TYPES.WHERE)}
          exact
          path={ROUTERS.LOCATION_POSTAL}
          component={LocationPostal}
        />

        {/* Post */}
        <PermissionRouter
          isPermission={checkPermission(SCOPES_TYPES.POST)}
          exact
          path={ROUTERS.POST_POSTAL}
          component={PostPostal}
        />

        <PermissionRouter
          isPermission={checkPermission(SCOPES_TYPES.POST)}
          exact
          path={ROUTERS.POST_DETAIL_BY_LOCATIONS}
          component={PostDetail}
        />

        {/* System */}
        <PermissionRouter
          isPermission={checkPermission()}
          exact
          path={ROUTERS.SYSTEM_POSTAL}
          component={SystemPostal}
        />

        {/* Create New */}
        <PermissionRouter
          isPermission={checkPermission(SCOPES_TYPES.POST)}
          path={ROUTERS.CREATE_NEW}
          component={CreateNewPostal}
        />

        {/* SOS */}
        <PermissionRouter
          isPermission={checkPermission()}
          exact
          path={ROUTERS.SOS_POSTAL}
          component={SOSPostal}
        />
        {/* Verify */}
        <PermissionRouter
          isPermission={checkPermission()}
          exact
          path={ROUTERS.VERIFY_POSTAL}
          component={VerifyPostal}
        />

        {/* Activity */}

        <PermissionRouter
          isPermission={checkPermission(SCOPES_TYPES.ACTIVITY)}
          exact
          path={ROUTERS.ACTIVITY_POSTAL}
          component={ActivityPostal}
        />

        {/* Food */}
        <PermissionRouter
          isPermission={checkPermission(SCOPES_TYPES.FOOD)}
          exact
          path={ROUTERS.FOOD_POSTAL}
          component={FoodPostal}
        />

        {/* Tour */}

        <PermissionRouter
          isPermission={checkPermission(SCOPES_TYPES.TOUR)}
          exact
          path={ROUTERS.TOUR_POSTAL}
          component={TourPostal}
        />

        {/* Report */}

        <PermissionRouter
          isPermission={checkPermission()}
          exact
          path={ROUTERS.REPORT_POSTAL}
          component={ReportPostal}
        />

        {/* Admin */}

        <PermissionRouter
          isPermission={checkPermission()}
          exact
          path={ROUTERS.PROFILE}
          component={Profile}
        />

        <PermissionRouter
          isPermission={checkPermission()}
          path={ROUTERS.UPDATE_PROFILE}
          component={ProfileUpdate}
        />

        <PermissionRouter
          isPermission={checkPermission()}
          exact
          path={ROUTERS.LIST_PLAN}
          component={ListPlan}
        />
        <PermissionRouter
          isPermission={checkPermission()}
          path={ROUTERS.PLAN_DETAIL}
          component={PlanDetail}
        />

        <PermissionRouter
          isPermission={checkPermission()}
          exact
          path={ROUTERS.LIST_NOTIFICATION}
          component={ListNotification}
        />

        <PermissionRouter
          isPermission={checkPermission()}
          exact
          path={ROUTERS.LIST_ADMIN}
          component={ListAdmin}
        />

        <PermissionRouter
          isPermission={checkPermission()}
          exact
          path={ROUTERS.ADMIN_ADD}
          component={AdminAdd}
        />

        <Redirect to="/app/dashboard" />
      </Switch>
    </Suspense>
  );
}
