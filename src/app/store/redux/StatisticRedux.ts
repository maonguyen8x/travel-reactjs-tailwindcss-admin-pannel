import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions<any, any>({
  getStatisticLocationRequest: ['filter'],
  getStatisticLocationSuccess: ['statisticLocation'],
  getStatisticLocationFailure: null,

  getStatisticPostRequest: ['filter'],
  getStatisticPostSuccess: ['statisticPost'],
  getStatisticPostFailure: null,

  getStatisticUserRequest: ['filter'],
  getStatisticUserSuccess: ['statisticUser'],
  getStatisticUserFailure: null,

  getStatisticPlanRequest: ['filter'],
  getStatisticPlanSuccess: ['statisticPlan'],
  getStatisticPlanFailure: null,

  getStatisticPageRequest: ['filter'],
  getStatisticPageSuccess: ['statisticPage'],
  getStatisticPageFailure: null,

  getStatisticDashboardRequest: null,
  getStatisticDashboardSuccess: ['statisticDashboard'],
  getStatisticDashboardFailure: null,

  getListUserStatisticRequest: ['offset', 'limit'],
  getListUserStatisticSuccess: ['usersWeekly'],
  getListUserStatisticFailure: null,

  getListLocationStatisticRequest: ['offset', 'limit'],
  getListLocationStatisticSuccess: ['locationsWeekly'],
  getListLocationStatisticFailure: null,

  getListPostStatisticRequest: ['offset', 'limit'],
  getListPostStatisticSuccess: ['postsWeekly'],
  getListPostStatisticFailure: null,

  getListPlanStatisticRequest: ['offset', 'limit'],
  getListPlanStatisticSuccess: ['plansWeekly'],
  getListPlanStatisticFailure: null,
});

export const StatisticTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  statisticLocation: [],
  statisticPost: [],
  statisticUser: [],
  statisticPlan: [],
  statisticDashboard: null,
  usersWeekly: [],
  locationsWeekly: [],
  postsWeekly: [],
  plansWeekly: [],
  statisticPage: [],
  filter: {
    fromDate: '',
    toDate: '',
    searchType: '',
  },
});

const getStatisticLocationRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getStatisticLocationSuccess = (state: any, { statisticLocation }: any) =>
  state.merge({
    fetching: false,
    error: null,
    statisticLocation,
  });

const getStatisticLocationFailure = (state: any) =>
  state.merge({
    fetching: false,
    error: true,
  });

const getStatisticPostRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getStatisticPostSuccess = (state: any, { statisticPost }: any) =>
  state.merge({
    fetching: false,
    error: null,
    statisticPost,
  });

const getStatisticPostFailure = (state: any) =>
  state.merge({
    fetching: false,
    error: true,
  });

const getStatisticUserRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getStatisticUserSuccess = (state: any, { statisticUser }: any) =>
  state.merge({
    fetching: false,
    error: null,
    statisticUser,
  });

const getStatisticUserFailure = (state: any) =>
  state.merge({
    fetching: false,
    error: true,
  });

const getStatisticPlanRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getStatisticPlanSuccess = (state: any, { statisticPlan }: any) =>
  state.merge({
    fetching: false,
    error: null,
    statisticPlan,
  });

const getStatisticPlanFailure = (state: any) =>
  state.merge({
    fetching: false,
    error: true,
  });

const getStatisticPageRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getStatisticPageSuccess = (state: any, { statisticPage }: any) =>
  state.merge({
    fetching: false,
    error: null,
    statisticPage,
  });

const getStatisticPageFailure = (state: any) =>
  state.merge({
    fetching: false,
    error: true,
  });

const getStatisticDashboardRequest = (state: any) =>
  state.merge({ fetching: true });

const getStatisticDashboardSuccess = (
  state: any,
  { statisticDashboard }: any
) =>
  state.merge({
    fetching: false,
    error: null,
    statisticDashboard,
  });

const getStatisticDashboardFailure = (state: any) =>
  state.merge({
    fetching: false,
    error: true,
  });

const getListUserStatisticRequest = (state: any) =>
  state.merge({ fetching: true });
const getListUserStatisticSuccess = (state: any, { usersWeekly }: any) =>
  state.merge({
    fetching: false,
    error: null,
    usersWeekly,
  });
const getListUserStatisticFailure = (state: any) =>
  state.merge({ fetching: false, error: true, usersWeekly: [] });

const getListLocationStatisticRequest = (state: any) =>
  state.merge({ fetching: true });
const getListLocationStatisticSuccess = (
  state: any,
  { locationsWeekly }: any
) =>
  state.merge({
    fetching: false,
    error: null,
    locationsWeekly,
  });
const getListLocationStatisticFailure = (state: any) =>
  state.merge({ fetching: false, error: true, locationsWeekly: [] });

const getListPostStatisticRequest = (state: any) =>
  state.merge({ fetching: true });
const getListPostStatisticSuccess = (state: any, { postsWeekly }: any) =>
  state.merge({
    fetching: false,
    error: null,
    postsWeekly,
  });
const getListPostStatisticFailure = (state: any) =>
  state.merge({ fetching: false, error: true, postsWeekly: [] });

const getListPlanStatisticRequest = (state: any) =>
  state.merge({ fetching: true });
const getListPlanStatisticSuccess = (state: any, { plansWeekly }: any) =>
  state.merge({
    fetching: false,
    error: null,
    plansWeekly,
  });
const getListPlanStatisticFailure = (state: any) =>
  state.merge({ fetching: false, error: true, plansWeekly: [] });

export const StatisticReducer = createReducer(INITIAL_STATE, {
  [Types.GET_STATISTIC_LOCATION_REQUEST]: getStatisticLocationRequest,
  [Types.GET_STATISTIC_LOCATION_SUCCESS]: getStatisticLocationSuccess,
  [Types.GET_STATISTIC_LOCATION_FAILURE]: getStatisticLocationFailure,

  [Types.GET_STATISTIC_POST_REQUEST]: getStatisticPostRequest,
  [Types.GET_STATISTIC_POST_SUCCESS]: getStatisticPostSuccess,
  [Types.GET_STATISTIC_POST_FAILURE]: getStatisticPostFailure,

  [Types.GET_STATISTIC_USER_REQUEST]: getStatisticUserRequest,
  [Types.GET_STATISTIC_USER_SUCCESS]: getStatisticUserSuccess,
  [Types.GET_STATISTIC_USER_FAILURE]: getStatisticUserFailure,

  [Types.GET_STATISTIC_PLAN_REQUEST]: getStatisticPlanRequest,
  [Types.GET_STATISTIC_PLAN_SUCCESS]: getStatisticPlanSuccess,
  [Types.GET_STATISTIC_PLAN_FAILURE]: getStatisticPlanFailure,

  [Types.GET_STATISTIC_PAGE_REQUEST]: getStatisticPageRequest,
  [Types.GET_STATISTIC_PAGE_SUCCESS]: getStatisticPageSuccess,
  [Types.GET_STATISTIC_PAGE_FAILURE]: getStatisticPageFailure,

  [Types.GET_STATISTIC_DASHBOARD_REQUEST]: getStatisticDashboardRequest,
  [Types.GET_STATISTIC_DASHBOARD_SUCCESS]: getStatisticDashboardSuccess,
  [Types.GET_STATISTIC_DASHBOARD_FAILURE]: getStatisticDashboardFailure,

  [Types.GET_LIST_USER_STATISTIC_REQUEST]: getListUserStatisticRequest,
  [Types.GET_LIST_USER_STATISTIC_SUCCESS]: getListUserStatisticSuccess,
  [Types.GET_LIST_USER_STATISTIC_FAILURE]: getListUserStatisticFailure,

  [Types.GET_LIST_LOCATION_STATISTIC_REQUEST]: getListLocationStatisticRequest,
  [Types.GET_LIST_LOCATION_STATISTIC_SUCCESS]: getListLocationStatisticSuccess,
  [Types.GET_LIST_LOCATION_STATISTIC_FAILURE]: getListLocationStatisticFailure,

  [Types.GET_LIST_POST_STATISTIC_REQUEST]: getListPostStatisticRequest,
  [Types.GET_LIST_POST_STATISTIC_SUCCESS]: getListPostStatisticSuccess,
  [Types.GET_LIST_POST_STATISTIC_FAILURE]: getListPostStatisticFailure,

  [Types.GET_LIST_PLAN_STATISTIC_REQUEST]: getListPlanStatisticRequest,
  [Types.GET_LIST_PLAN_STATISTIC_SUCCESS]: getListPlanStatisticSuccess,
  [Types.GET_LIST_PLAN_STATISTIC_FAILURE]: getListPlanStatisticFailure,
});
