import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  getListFacilityRequest: ['filter'],
  getListFacilitySuccess: ['listFacility', 'pages'],
  getListFacilityFailure: null,

  deleteFacilityRequest: ['id'],
  deleteFacilitySuccess: null,
  deleteFacilityFailure: null,

  createFacilityRequest: ['facility'],
  createFacilitySuccess: null,
  createFacilityFailure: null,
});

export const FacilityTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  fetchingFacility: false,
  fetchingCreateFacility: false,
  error: null,
  listFacility: [],
  pages: 0,
  filter: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.ID_NEWEST,
    offset: 0,
    limit: 10,
    search: '',
  },
});
/* ------------- Reducers ------------- */

const getListFacilityRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingFacility: true, filter });
const getListFacilitySuccess = (state: any, { listFacility, pages }: any) =>
  state.merge({
    fetchingFacility: false,
    error: null,
    listFacility,
    pages,
  });
const getListFacilityFailure = (state: any) =>
  state.merge({ fetchingFacility: false, listFacility: [] });

const deleteFacilityRequest = (state: any) => state.merge({ fetching: true });
const deleteFacilitySuccess = (state: any) =>
  state.merge({
    error: null,
    fetching: false,
  });
const deleteFacilityFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const createFacilityRequest = (state: any) =>
  state.merge({ fetchingCreateFacility: true });
const createFacilitySuccess = (state: any) =>
  state.merge({
    fetchingCreateFacility: false,
  });
const createFacilityFailure = (state: any) =>
  state.merge({ fetchingCreateFacility: false });

/* ------------- Hookup Reducers To Types ------------- */
export const FacilityReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_FACILITY_REQUEST]: getListFacilityRequest,
  [Types.GET_LIST_FACILITY_SUCCESS]: getListFacilitySuccess,
  [Types.GET_LIST_FACILITY_FAILURE]: getListFacilityFailure,

  [Types.DELETE_FACILITY_REQUEST]: deleteFacilityRequest,
  [Types.DELETE_FACILITY_SUCCESS]: deleteFacilitySuccess,
  [Types.DELETE_FACILITY_FAILURE]: deleteFacilityFailure,

  [Types.CREATE_FACILITY_REQUEST]: createFacilityRequest,
  [Types.CREATE_FACILITY_SUCCESS]: createFacilitySuccess,
  [Types.CREATE_FACILITY_FAILURE]: createFacilityFailure,
});
