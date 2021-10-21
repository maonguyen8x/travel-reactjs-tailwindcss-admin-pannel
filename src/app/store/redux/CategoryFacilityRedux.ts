import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  getListCategoryFacilityRequest: ['filter'],
  getListCategoryFacilitySuccess: ['listCategoryFacility', 'pages'],
  getListCategoryFacilityFailure: null,

  deleteCategoryFacilityRequest: ['id'],
  deleteCategoryFacilitySuccess: null,
  deleteCategoryFacilityFailure: null,

  createCategoryFacilityRequest: ['categoryFacilities'],
  createCategoryFacilitySuccess: null,
  createCategoryFacilityFailure: null,
});

export const CategoryFacilityTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  fetchingCategoryFacility: false,
  fetchingCreateCategoryFacility: false,
  error: null,
  listCategoryFacility: [],
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

const getListCategoryFacilityRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingCategoryFacility: true, filter });
const getListCategoryFacilitySuccess = (
  state: any,
  { listCategoryFacility, pages }: any
) =>
  state.merge({
    fetchingCategoryFacility: false,
    error: null,
    listCategoryFacility,
    pages,
  });
const getListCategoryFacilityFailure = (state: any) =>
  state.merge({ fetchingCategoryFacility: false, listCategoryFacility: [] });

const deleteCategoryFacilityRequest = (state: any) =>
  state.merge({ fetching: true });
const deleteCategoryFacilitySuccess = (state: any) =>
  state.merge({
    error: null,
    fetching: false,
  });
const deleteCategoryFacilityFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const createCategoryFacilityRequest = (state: any) =>
  state.merge({ fetchingCreateCategoryFacility: true });
const createCategoryFacilitySuccess = (state: any) =>
  state.merge({
    fetchingCreateCategoryFacility: false,
  });
const createCategoryFacilityFailure = (state: any) =>
  state.merge({ fetchingCreateCategoryFacility: false });

/* ------------- Hookup Reducers To Types ------------- */
export const CategoryFacilityReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_CATEGORY_FACILITY_REQUEST]: getListCategoryFacilityRequest,
  [Types.GET_LIST_CATEGORY_FACILITY_SUCCESS]: getListCategoryFacilitySuccess,
  [Types.GET_LIST_CATEGORY_FACILITY_FAILURE]: getListCategoryFacilityFailure,

  [Types.DELETE_CATEGORY_FACILITY_REQUEST]: deleteCategoryFacilityRequest,
  [Types.DELETE_CATEGORY_FACILITY_SUCCESS]: deleteCategoryFacilitySuccess,
  [Types.DELETE_CATEGORY_FACILITY_FAILURE]: deleteCategoryFacilityFailure,

  [Types.CREATE_CATEGORY_FACILITY_REQUEST]: createCategoryFacilityRequest,
  [Types.CREATE_CATEGORY_FACILITY_SUCCESS]: createCategoryFacilitySuccess,
  [Types.CREATE_CATEGORY_FACILITY_FAILURE]: createCategoryFacilityFailure,
});
