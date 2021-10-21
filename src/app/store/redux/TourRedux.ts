import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  getListTourRequest: ['filter'],
  getListTourSuccess: ['listTour', 'pages'],
  getListTourFailure: null,

  createTourRequest: ['tour'],

  getTourByIdRequest: ['id'],
  getTourByIdSuccess: ['tourDetail'],
  getTourByIdFailure: null,

  deleteTourRequest: ['id'],

  editTourRequest: ['id', 'tour'],

  getListServicesRequest: ['filter'],
  getListServicesSuccess: ['listServices', 'pages'],
  getListServicesFailure: null,

  getListPageReviewsRequest: ['filter'],
  getListPageReviewsSuccess: ['listPageReviews', 'pages'],
  getListPageReviewsFailure: null,

  getListPageNewsRequest: ['filterNews'],
  getListPageNewsSuccess: ['listPageNews', 'pages'],
  getListPageNewsFailure: null,
});

export const TourTypes = Types;
export default Creators;

export const TourSelectors = {
  getCurrentFilterGetListTour: (state: any) => state.tour.filter,
};

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingTour: false,
  fetching: false,
  error: null,
  listTour: [],
  pages: 0,
  tourDetail: null,
  fetchingTourDetail: false,
  fetchingCreateTour: false,
  listServices: [],
  listPageReviews: [],
  listPageNews: [],
  filter: {
    searchType: '',
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    search: '',
    mine: 'mine',
  },
  filterNews: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    creator: '',
    pageId: '',
    search: '',
  },
});
/* ------------- Reducers ------------- */

const getListTourRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingTour: true, filter });
const getListTourSuccess = (state: any, { listTour, pages }: any) =>
  state.merge({
    fetchingTour: false,
    error: null,
    listTour,
    pages,
  });
const getListTourFailure = (state: any) =>
  state.merge({ fetchingTour: false, listTour: [] });
const createTourRequest = (state: any) =>
  state.merge({ fetchingCreateTour: true });

const getTourByIdRequest = (state: any) =>
  state.merge({ fetchingTourDetail: true });
const getTourByIdSuccess = (state: any, { tourDetail }: any) =>
  state.merge({
    fetchingTourDetail: false,
    tourDetail,
  });
const getTourByIdFailure = (state: any) =>
  state.merge({ fetchingTourDetail: false, tourDetail: null });
const deleteTourRequest = (state: any) => state.merge({ fetching: true });

const editTourRequest = (state: any) => state.merge({ fetching: true });

const getListServicesRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });
const getListServicesSuccess = (state: any, { listServices, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    listServices,
    pages,
  });
const getListServicesFailure = (state: any) => state.merge({ fetching: false });

const getListPageReviewsRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });
const getListPageReviewsSuccess = (
  state: any,
  { listPageReviews, pages }: any
) =>
  state.merge({
    fetching: false,
    error: null,
    listPageReviews,
    pages,
  });
const getListPageReviewsFailure = (state: any) =>
  state.merge({ fetching: false });

const getListPageNewsRequest = (state: any, { filterNews }: any) =>
  state.merge({ fetching: true, filterNews });
const getListPageNewsSuccess = (state: any, { listPageNews, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    listPageNews,
    pages,
  });
const getListPageNewsFailure = (state: any) => state.merge({ fetching: false });

/* ------------- Hookup Reducers To Types ------------- */
export const TourReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_TOUR_REQUEST]: getListTourRequest,
  [Types.GET_LIST_TOUR_SUCCESS]: getListTourSuccess,
  [Types.GET_LIST_TOUR_FAILURE]: getListTourFailure,

  [Types.CREATE_TOUR_REQUEST]: createTourRequest,

  [Types.GET_TOUR_BY_ID_REQUEST]: getTourByIdRequest,
  [Types.GET_TOUR_BY_ID_SUCCESS]: getTourByIdSuccess,
  [Types.GET_TOUR_BY_ID_FAILURE]: getTourByIdFailure,

  [Types.DELETE_TOUR_REQUEST]: deleteTourRequest,

  [Types.EDIT_TOUR_REQUEST]: editTourRequest,

  [Types.GET_LIST_SERVICES_REQUEST]: getListServicesRequest,
  [Types.GET_LIST_SERVICES_SUCCESS]: getListServicesSuccess,
  [Types.GET_LIST_SERVICES_FAILURE]: getListServicesFailure,

  [Types.GET_LIST_PAGE_REVIEWS_REQUEST]: getListPageReviewsRequest,
  [Types.GET_LIST_PAGE_REVIEWS_SUCCESS]: getListPageReviewsSuccess,
  [Types.GET_LIST_PAGE_REVIEWS_FAILURE]: getListPageReviewsFailure,

  [Types.GET_LIST_PAGE_NEWS_REQUEST]: getListPageNewsRequest,
  [Types.GET_LIST_PAGE_NEWS_SUCCESS]: getListPageNewsSuccess,
  [Types.GET_LIST_PAGE_NEWS_FAILURE]: getListPageNewsFailure,
});
