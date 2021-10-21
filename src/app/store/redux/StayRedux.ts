import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  getListStayRequest: ['filter'],
  getListStaySuccess: ['listStay', 'pages'],
  getListStayFailure: null,

  createStayRequest: ['stay'],
  createStaySuccess: null,
  createStayFailure: null,

  editStayRequest: ['id', 'stay'],
  editStaySuccess: null,
  editStayFailure: null,

  deleteStayRequest: ['id'],
  deleteStaySuccess: null,
  deleteStayFailure: null,

  getStayByIdRequest: ['id'],
  getStayByIdSuccess: ['stayDetail'],
  getStayByIdFailure: null,

  listReviewBookingStayRequest: ['id', 'filterReview'],
  listReviewBookingStaySuccess: ['listReview', 'pages'],
  listReviewBookingStayFailure: null,
});

export const StayyTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingStay: false,
  fetchingStayId: false,
  error: null,
  listStay: [],
  listReview: [],
  offset: 0,
  limit: 10,
  pages: 0,
  stayDetail: null,
  filter: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    creator: '',
    pageId: '',
    search: '',
    fromDate: '',
    toDate: '',
  },

  filterReview: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    creator: '',
    pageId: '',
    search: '',
    fromDate: '',
    toDate: '',
  },
});
/* ------------- Reducers ------------- */

const getListStayRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingStay: true, filter });
const getListStaySuccess = (state: any, { listStay, pages }: any) =>
  state.merge({
    fetchingStay: false,
    error: null,
    listStay,
    pages,
  });
const getListStayFailure = (state: any) =>
  state.merge({ fetchingStay: false, error: true });

const createStayRequest = (state: any) => state.merge({ fetchingStay: true });
const createStaySuccess = (state: any) =>
  state.merge({
    fetchingStay: false,
    error: null,
  });
const createStayFailure = (state: any) =>
  state.merge({ fetchingStay: false, error: true });

const editStayRequest = (state: any) => state.merge({ fetchingStay: true });
const editStaySuccess = (state: any) =>
  state.merge({
    fetchingStay: false,
    error: null,
  });
const editStayFailure = (state: any) =>
  state.merge({ fetchingStay: false, error: true });

const deleteStayRequest = (state: any) => state.merge({ fetchingStay: true });
const deleteStaySuccess = (state: any) =>
  state.merge({
    fetchingStay: false,
    error: null,
  });
const deleteStayFailure = (state: any) =>
  state.merge({ fetchingStay: false, error: true });

const getStayByIdRequest = (state: any) =>
  state.merge({ fetchingStayId: true });
const getStayByIdSuccess = (state: any, { stayDetail }: any) =>
  state.merge({
    fetchingStayId: false,
    error: null,
    stayDetail,
  });
const getStayByIdFailure = (state: any) =>
  state.merge({ fetchingStayId: false, error: true, stayDetail: [] });

const listReviewBookingStayRequest = (state: any, { filterReview }: any) =>
  state.merge({ fetching: true, filterReview });
const listReviewBookingStaySuccess = (state: any, { listReview, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    listReview,
    pages,
  });
const listReviewBookingStayFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

/* ------------- Hookup Reducers To Types ------------- */
export const StayReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_STAY_REQUEST]: getListStayRequest,
  [Types.GET_LIST_STAY_SUCCESS]: getListStaySuccess,
  [Types.GET_LIST_STAY_FAILURE]: getListStayFailure,

  [Types.CREATE_STAY_REQUEST]: createStayRequest,
  [Types.CREATE_STAY_SUCCESS]: createStaySuccess,
  [Types.CREATE_STAY_FAILURE]: createStayFailure,

  [Types.EDIT_STAY_REQUEST]: editStayRequest,
  [Types.EDIT_STAY_SUCCESS]: editStaySuccess,
  [Types.EDIT_STAY_FAILURE]: editStayFailure,

  [Types.DELETE_STAY_REQUEST]: deleteStayRequest,
  [Types.DELETE_STAY_SUCCESS]: deleteStaySuccess,
  [Types.DELETE_STAY_FAILURE]: deleteStayFailure,

  [Types.GET_STAY_BY_ID_REQUEST]: getStayByIdRequest,
  [Types.GET_STAY_BY_ID_SUCCESS]: getStayByIdSuccess,
  [Types.GET_STAY_BY_ID_FAILURE]: getStayByIdFailure,

  [Types.LIST_REVIEW_BOOKING_STAY_REQUEST]: listReviewBookingStayRequest,
  [Types.LIST_REVIEW_BOOKING_STAY_SUCCESS]: listReviewBookingStaySuccess,
  [Types.LIST_REVIEW_BOOKING_STAY_FAILURE]: listReviewBookingStayFailure,
});
