import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';

const { Types, Creators } = createActions<any, any>({
  getListPlanRequest: ['id', 'filter'],
  getListPlanSuccess: ['listPlan', 'pages'],
  getListPlanFailure: null,

  getPlanByIdRequest: ['id'],
  getPlanByIdSuccess: ['planDetail'],
  getPlanByIdFailure: null,
});

export const PlanTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  offset: 0,
  limit: 10,
  pages: 0,
  listPlan: [],
  planDetail: null,
  filter: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    search: '',
    fromDate: '',
    toDate: '',
    status: '',
  },
});

const getListPlanRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getListPlanSuccess = (state: any, { listPlan, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    listPlan,
    pages,
  });

const getListPlanFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const getPlanByIdRequest = (state: any) => state.merge({ fetching: true });

const getPlanByIdSuccess = (state: any, { planDetail }: any) =>
  state.merge({
    fetching: false,
    error: null,
    planDetail,
  });

const getPlanByIdFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

export const PlanReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_PLAN_REQUEST]: getListPlanRequest,
  [Types.GET_LIST_PLAN_SUCCESS]: getListPlanSuccess,
  [Types.GET_LIST_PLAN_FAILURE]: getListPlanFailure,

  [Types.GET_PLAN_BY_ID_REQUEST]: getPlanByIdRequest,
  [Types.GET_PLAN_BY_ID_SUCCESS]: getPlanByIdSuccess,
  [Types.GET_PLAN_BY_ID_FAILURE]: getPlanByIdFailure,
});
