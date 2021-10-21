import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  getListCategoryAmenityRequest: ['filter'],
  getListCategoryAmenitySuccess: ['listCategoryAmenity', 'pages'],
  getListCategoryAmenityFailure: null,

  deleteCategoryAmenityRequest: ['id'],
  deleteCategoryAmenitySuccess: null,
  deleteCategoryAmenityFailure: null,

  createCategoryAmenityRequest: ['categoryAmenity'],
  createCategoryAmenitySuccess: null,
  createCategoryAmenityFailure: null,
});

export const CategoryAmenityTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  fetchingCategoryAmenity: false,
  fetchingCreateCategoryAmenity: false,
  error: null,
  listCategoryAmenity: [],
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

const getListCategoryAmenityRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingCategoryAmenity: true, filter });
const getListCategoryAmenitySuccess = (
  state: any,
  { listCategoryAmenity, pages }: any
) =>
  state.merge({
    fetchingCategoryAmenity: false,
    error: null,
    listCategoryAmenity,
    pages,
  });
const getListCategoryAmenityFailure = (state: any) =>
  state.merge({ fetchingCategoryAmenity: false, listCategoryAmenity: [] });

const deleteCategoryAmenityRequest = (state: any) =>
  state.merge({ fetching: true });
const deleteCategoryAmenitySuccess = (state: any) =>
  state.merge({
    error: null,
    fetching: false,
  });
const deleteCategoryAmenityFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const createCategoryAmenityRequest = (state: any) =>
  state.merge({ fetchingCreateCategoryAmenity: true });
const createCategoryAmenitySuccess = (state: any) =>
  state.merge({
    fetchingCreateCategoryAmenity: false,
  });
const createCategoryAmenityFailure = (state: any) =>
  state.merge({ fetchingCreateCategoryAmenity: false });

/* ------------- Hookup Reducers To Types ------------- */
export const CategoryAmenityReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_CATEGORY_AMENITY_REQUEST]: getListCategoryAmenityRequest,
  [Types.GET_LIST_CATEGORY_AMENITY_SUCCESS]: getListCategoryAmenitySuccess,
  [Types.GET_LIST_CATEGORY_AMENITY_FAILURE]: getListCategoryAmenityFailure,

  [Types.DELETE_CATEGORY_AMENITY_REQUEST]: deleteCategoryAmenityRequest,
  [Types.DELETE_CATEGORY_AMENITY_SUCCESS]: deleteCategoryAmenitySuccess,
  [Types.DELETE_CATEGORY_AMENITY_FAILURE]: deleteCategoryAmenityFailure,

  [Types.CREATE_CATEGORY_AMENITY_REQUEST]: createCategoryAmenityRequest,
  [Types.CREATE_CATEGORY_AMENITY_SUCCESS]: createCategoryAmenitySuccess,
  [Types.CREATE_CATEGORY_AMENITY_FAILURE]: createCategoryAmenityFailure,
});
