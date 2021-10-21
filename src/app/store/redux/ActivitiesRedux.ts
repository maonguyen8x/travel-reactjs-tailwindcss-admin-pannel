import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { FILTER } from '../../constants';

const { Types, Creators } = createActions<any, any>({
  getListActivitiesRequest: ['filter'],
  getListActivitiesSuccess: ['listActivities', 'pages'],
  getListActivitiesFailure: null,

  getActivitiesByIdRequest: ['id'],
  getActivitiesByIdSuccess: ['activitiesDetail'],
  getActivitiesByIdFailure: null,

  editActivitiesRequest: ['id', 'activities'],

  deleteActivitiesRequest: ['id', 'data'],

  lockActivitiesRequest: ['id', 'data'],
});

export const ActivitiesTypes = Types;
export default Creators;

export const ActivitySelectors = {
  getCurrentFilterGetListActivities: (state: any) => state.activities.filter,
};

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  pages: 0,
  listActivities: [],
  activitiesDetail: [],
  listJoin: [],
  filter: {
    searchType: '',
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    search: '',
    mine: 'mine',
  },
});

const getListActivitiesRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter: filter || state.filter });

const getListActivitiesSuccess = (state: any, { listActivities, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    listActivities,
    pages,
  });

const getListActivitiesFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const getActivitiesByIdRequest = (state: any) =>
  state.merge({ fetching: true });

const getActivitiesByIdSuccess = (state: any, { activitiesDetail }: any) =>
  state.merge({
    fetching: false,
    error: null,
    activitiesDetail,
  });

const getActivitiesByIdFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

export const ActivitiesReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_ACTIVITIES_REQUEST]: getListActivitiesRequest,
  [Types.GET_LIST_ACTIVITIES_SUCCESS]: getListActivitiesSuccess,
  [Types.GET_LIST_ACTIVITIES_FAILURE]: getListActivitiesFailure,

  [Types.GET_ACTIVITIES_BY_ID_REQUEST]: getActivitiesByIdRequest,
  [Types.GET_ACTIVITIES_BY_ID_SUCCESS]: getActivitiesByIdSuccess,
  [Types.GET_ACTIVITIES_BY_ID_FAILURE]: getActivitiesByIdFailure,
});
