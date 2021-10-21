import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  getListAmenitiesRequest: ['filter'],
  getListAmenitiesSuccess: ['listAmenities', 'pages'],
  getListAmenitiesFailure: null,

  deleteAmenitiesRequest: ['id'],
  deleteAmenitiesSuccess: null,
  deleteAmenitiesFailure: null,

  createAmenitiesRequest: ['amenities'],
  createAmenitiesSuccess: null,
  createAmenitiesFailure: null,
});

export const AmenitiesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  fetchingAmenities: false,
  fetchingCreateAmenities: false,
  error: null,
  listAmenities: [],
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

const getListAmenitiesRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingAmenities: true, filter });
const getListAmenitiesSuccess = (state: any, { listAmenities, pages }: any) =>
  state.merge({
    fetchingAmenities: false,
    error: null,
    listAmenities,
    pages,
  });
const getListAmenitiesFailure = (state: any) =>
  state.merge({ fetchingAmenities: false, listAmenities: [] });

const deleteAmenitiesRequest = (state: any) => state.merge({ fetching: true });
const deleteAmenitiesSuccess = (state: any) =>
  state.merge({
    error: null,
    fetching: false,
  });
const deleteAmenitiesFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const createAmenitiesRequest = (state: any) =>
  state.merge({ fetchingCreateAmenities: true });
const createAmenitiesSuccess = (state: any) =>
  state.merge({
    fetchingCreateAmenities: false,
  });
const createAmenitiesFailure = (state: any) =>
  state.merge({ fetchingCreateAmenities: false });

/* ------------- Hookup Reducers To Types ------------- */
export const AmenitiesReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_AMENITIES_REQUEST]: getListAmenitiesRequest,
  [Types.GET_LIST_AMENITIES_SUCCESS]: getListAmenitiesSuccess,
  [Types.GET_LIST_AMENITIES_FAILURE]: getListAmenitiesFailure,

  [Types.DELETE_AMENITIES_REQUEST]: deleteAmenitiesRequest,
  [Types.DELETE_AMENITIES_SUCCESS]: deleteAmenitiesSuccess,
  [Types.DELETE_AMENITIES_FAILURE]: deleteAmenitiesFailure,

  [Types.CREATE_AMENITIES_REQUEST]: createAmenitiesRequest,
  [Types.CREATE_AMENITIES_SUCCESS]: createAmenitiesSuccess,
  [Types.CREATE_AMENITIES_FAILURE]: createAmenitiesFailure,
});
