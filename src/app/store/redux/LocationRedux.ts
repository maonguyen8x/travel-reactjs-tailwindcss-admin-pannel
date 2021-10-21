import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { FILTER, SEARCH_TYPES } from '../../constants';

const { Types, Creators } = createActions<any, any>({
  createLocationRequest: ['location'],

  deleteLocationRequest: ['id', 'data'],

  getListAttractionsRequest: ['filter'],
  getListAttractionsSuccess: ['attractions', 'pages'],
  getListAttractionsFailure: null,

  getListLocationsRequest: ['filterListLocations'],
  getListLocationsSuccess: ['listLocations', 'pages'],
  getListLocationsFailure: null,

  getLocationByIdRequest: ['id'],
  getLocationByIdSuccess: ['data'],
  getLocationByIdFailure: null,

  getListLocationDuplicatedRequest: ['filterLocationDuplicated'],
  getListLocationDuplicatedSuccess: ['listLocationDuplicated', 'pages'],
  getListLocationDuplicatedFailure: null,

  getListRequestChangeLocationRequest: ['filterChangeLocation'],
  getListRequestChangeLocationSuccess: ['data', 'pages'],
  getListRequestChangeLocationFailure: null,

  changeStatusLocationRequest: ['id', 'data'],

  getRequestChangeLocationByIdRequest: ['id'],
  getRequestChangeLocationByIdSuccess: ['data'],
  getRequestChangeLocationByIdFailure: null,

  getUserIdLocationRequest: ['filter'],
  getUserIdLocationSuccess: ['userIdLocation', 'pages'],
  getUserIdLocationFailure: null,

  lockLocationRequest: ['id', 'data'],
});

export const LocationTypes = Types;
export default Creators;

export const LocationSelectors = {
  getCurrentFilterGetListAttractions: (state: any) => state.location.filter,
  getCurrentFilterGetListLocations: (state: any) =>
    state.location.filterListLocations,
  getCurrentFilterGetRequestChangeListLocation: (state: any) =>
    state.location.filterChangeLocation,
  getCurrentFilterGetListLocationDuplicated: (state: any) =>
    state.location.filterLocationDuplicated,
};

const INITIAL_STATE = Immutable({
  fetching: false,
  fetchingListLocation: false,
  fetchingLocationDetail: false,
  fetchingListLocationDuplicated: false,
  fetchingRequestChangeLocationDetail: false,
  fetchingListRequestChangeLocation: false,
  error: null,
  listLocationDuplicated: [],
  listRequestChangeLocation: [],
  locationDetail: null,
  requestChangeLocationDetail: null,
  userIdLocation: null,
  attractions: null,
  pages: 0,
  filter: {
    searchType: '',
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    search: '',
    mine: 'mine',
  },
  filterListLocations: {
    searchType: '',
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    search: '',
    mine: 'mine',
  },
  filterLocationDuplicated: {
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    search: '',
  },
  filterChangeLocation: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.CHANGE_LOCATION,
    offset: 0,
    limit: 10,
    search: '',
  },
});

const getListAttractionsRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter: filter || state.filter });
const getListAttractionsSuccess = (state: any, { attractions, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    attractions,
    pages,
  });
const getListAttractionsFailure = (state: any) =>
  state.merge({ fetching: false, error: true, attractions: [] });

const getListLocationsRequest = (state: any, { filterListLocations }: any) =>
  state.merge({
    fetching: true,
    filterListLocations: filterListLocations || state.filterListLocations,
  });
const getListLocationsSuccess = (state: any, { listLocations, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    listLocations,
    pages,
  });
const getListLocationsFailure = (state: any) =>
  state.merge({ fetching: false, error: true, listLocations: [] });

const getListLocationDuplicatedRequest = (
  state: any,
  { filterLocationDuplicated }: any
) =>
  state.merge({
    fetchingListLocationDuplicated: true,
    filterLocationDuplicated,
  });
const getListLocationDuplicatedSuccess = (
  state: any,
  { listLocationDuplicated, pages }: any
) =>
  state.merge({
    fetchingListLocationDuplicated: false,
    error: null,
    listLocationDuplicated,
    pages,
  });
const getListLocationDuplicatedFailure = (state: any) =>
  state.merge({
    fetchingListLocationDuplicated: false,
    error: true,
    listLocationDuplicated: [],
  });

const getLocationByIdRequest = (state: any) =>
  state.merge({ fetchingLocationDetail: true });
const getLocationByIdSuccess = (state: any, { data }: any) =>
  state.merge({
    fetchingLocationDetail: false,
    error: null,
    locationDetail: data,
  });
const getLocationByIdFailure = (state: any) =>
  state.merge({
    fetchingLocationDetail: false,
    error: true,
    locationDetail: [],
  });

const getUserIdLocationRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });
const getUserIdLocationSuccess = (state: any, { userIdLocation, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    userIdLocation,
    pages,
  });
const getUserIdLocationFailure = (state: any) =>
  state.merge({ fetching: false, error: true, userIdLocation: [] });

const getListRequestChangeLocationRequest = (
  state: any,
  { filterChangeLocation }: any
) =>
  state.merge({
    fetchingListRequestChangeLocation: true,
    filterChangeLocation,
  });
const getListRequestChangeLocationSuccess = (
  state: any,
  { data, pages }: any
) =>
  state.merge({
    fetchingListRequestChangeLocation: false,
    error: null,
    listRequestChangeLocation: data,
    pages,
  });
const getListRequestChangeLocationFailure = (state: any) =>
  state.merge({
    fetchingListRequestChangeLocation: false,
    error: true,
    listRequestChangeLocation: [],
  });

const getRequestChangeLocationByIdRequest = (state: any) =>
  state.merge({ fetchingRequestChangeLocationDetail: true });
const getRequestChangeLocationByIdSuccess = (state: any, { data }: any) =>
  state.merge({
    fetchingRequestChangeLocationDetail: false,
    error: null,
    requestChangeLocationDetail: data,
  });
const getRequestChangeLocationByIdFailure = (state: any) =>
  state.merge({
    fetchingRequestChangeLocationDetail: false,
    error: true,
    requestChangeLocationDetail: [],
  });

export const LocationReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_ATTRACTIONS_REQUEST]: getListAttractionsRequest,
  [Types.GET_LIST_ATTRACTIONS_SUCCESS]: getListAttractionsSuccess,
  [Types.GET_LIST_ATTRACTIONS_FAILURE]: getListAttractionsFailure,

  [Types.GET_LIST_LOCATIONS_REQUEST]: getListLocationsRequest,
  [Types.GET_LIST_LOCATIONS_SUCCESS]: getListLocationsSuccess,
  [Types.GET_LIST_LOCATIONS_FAILURE]: getListLocationsFailure,

  [Types.GET_LIST_LOCATION_DUPLICATED_REQUEST]: getListLocationDuplicatedRequest,
  [Types.GET_LIST_LOCATION_DUPLICATED_SUCCESS]: getListLocationDuplicatedSuccess,
  [Types.GET_LIST_LOCATION_DUPLICATED_FAILURE]: getListLocationDuplicatedFailure,

  [Types.GET_LOCATION_BY_ID_REQUEST]: getLocationByIdRequest,
  [Types.GET_LOCATION_BY_ID_SUCCESS]: getLocationByIdSuccess,
  [Types.GET_LOCATION_BY_ID_FAILURE]: getLocationByIdFailure,

  [Types.GET_USER_ID_LOCATION_REQUEST]: getUserIdLocationRequest,
  [Types.GET_USER_ID_LOCATION_SUCCESS]: getUserIdLocationSuccess,
  [Types.GET_USER_ID_LOCATION_FAILURE]: getUserIdLocationFailure,

  [Types.GET_LIST_REQUEST_CHANGE_LOCATION_REQUEST]: getListRequestChangeLocationRequest,
  [Types.GET_LIST_REQUEST_CHANGE_LOCATION_SUCCESS]: getListRequestChangeLocationSuccess,
  [Types.GET_LIST_REQUEST_CHANGE_LOCATION_FAILURE]: getListRequestChangeLocationFailure,

  [Types.GET_REQUEST_CHANGE_LOCATION_BY_ID_REQUEST]: getRequestChangeLocationByIdRequest,
  [Types.GET_REQUEST_CHANGE_LOCATION_BY_ID_SUCCESS]: getRequestChangeLocationByIdSuccess,
  [Types.GET_REQUEST_CHANGE_LOCATION_BY_ID_FAILURE]: getRequestChangeLocationByIdFailure,
});
