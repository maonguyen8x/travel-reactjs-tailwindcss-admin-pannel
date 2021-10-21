import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';

const { Types, Creators } = createActions<any, any>({
  getListPageFoodRequest: ['filter'],
  getListPageFoodSuccess: ['listFoodPage', 'pages'],
  getListPageFoodFailure: null,

  getPageFoodByIdRequest: ['id'],
  getPageFoodByIdSuccess: ['foodPageDetail'],
  getPageFoodByIdFailure: null,

  getListPageReviewRequest: ['filter'],
  getListPageReviewSuccess: ['listPageReview', 'pages'],
  getListPageReviewFailure: null,

  getListPageFoodNewsRequest: ['filterNews'],
  getListPageFoodNewsSuccess: ['listFoodPageNews', 'pages'],
  getListPageFoodNewsFailure: null,

  createPageRequest: ['page'],

  getListVerifyPageRequest: ['filter'],
  getListVerifyPageSuccess: ['listVerifyPage', 'pages'],
  getListVerifyPageFailure: null,

  getListVerifyPageIdRequest: ['id'],
  getListVerifyPageIdSuccess: ['verifyDetail'],
  getListVerifyPageIdFailure: null,

  lockPageRequest: ['id', 'data'],

  deletePageRequest: ['id', 'data'],
});

export const PageTypes = Types;
export default Creators;

export const PageSelectors = {
  getCurrentFilterGetListPageFood: (state: any) => state.food.filter,
};

export const INITIAL_STATE = Immutable({
  fetchingListFoodPage: false,
  fetchingFoodPageDetail: false,
  fetchingPageServiceDetail: false,
  fetchingListPageReview: false,
  fetchingListFoodPageNews: false,
  fetching: false,
  error: null,
  listFoodPage: [],
  listPageReview: [],
  listFoodPageNews: [],
  foodPageDetail: null,
  pageDetail: [],
  services: null,
  pages: 0,
  listVerifyPage: [],
  verifyDetail: [],
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
    search: '',
  },
  data: [],
});

const getListPageFoodRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingListFoodPage: true, filter: filter || state.filter });
const getListPageFoodSuccess = (state: any, { listFoodPage, pages }: any) =>
  state.merge({
    fetchingListFoodPage: false,
    error: null,
    listFoodPage,
    pages,
  });
const getListPageFoodFailure = (state: any) =>
  state.merge({ fetchingListFoodPage: false, error: true });

const getPageFoodByIdRequest = (state: any) =>
  state.merge({ fetchingFoodPageDetail: true });
const getPageFoodByIdSuccess = (state: any, { foodPageDetail }: any) =>
  state.merge({
    fetchingFoodPageDetail: false,
    foodPageDetail,
  });
const getPageFoodByIdFailure = (state: any) =>
  state.merge({ fetchingFoodPageDetail: false, foodPageDetail: null });

const getListPageReviewRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingListPageReview: true, filter });
const getListPageReviewSuccess = (state: any, { listPageReview, pages }: any) =>
  state.merge({
    fetchingListPageReview: false,
    error: null,
    listPageReview,
    pages,
  });
const getListPageReviewFailure = (state: any) =>
  state.merge({ fetchingListPageReview: false, error: true });

const getListPageFoodNewsRequest = (state: any, { filterNews }: any) =>
  state.merge({ fetching: true, filterNews });
const getListPageFoodNewsSuccess = (
  state: any,
  { listFoodPageNews, pages }: any
) =>
  state.merge({
    fetching: false,
    error: null,
    listFoodPageNews,
    pages,
  });
const getListPageFoodNewsFailure = (state: any) =>
  state.merge({ fetching: false });

const createPageRequest = (state: any) => state.merge({ fetching: true });

const getListVerifyPageRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });
const getListVerifyPageSuccess = (state: any, { listVerifyPage, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    listVerifyPage,
    pages,
  });
const getListVerifyPageFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const getListVerifyPageIdRequest = (state: any) =>
  state.merge({ fetching: true });
const getListVerifyPageIdSuccess = (state: any, { verifyDetail }: any) =>
  state.merge({
    fetching: false,
    error: null,
    verifyDetail,
  });
const getListVerifyPageIdFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

export const PageReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_PAGE_FOOD_REQUEST]: getListPageFoodRequest,
  [Types.GET_LIST_PAGE_FOOD_SUCCESS]: getListPageFoodSuccess,
  [Types.GET_LIST_PAGE_FOOD_FAILURE]: getListPageFoodFailure,

  [Types.GET_PAGE_FOOD_BY_ID_REQUEST]: getPageFoodByIdRequest,
  [Types.GET_PAGE_FOOD_BY_ID_SUCCESS]: getPageFoodByIdSuccess,
  [Types.GET_PAGE_FOOD_BY_ID_FAILURE]: getPageFoodByIdFailure,

  [Types.GET_LIST_PAGE_REVIEW_REQUEST]: getListPageReviewRequest,
  [Types.GET_LIST_PAGE_REVIEW_SUCCESS]: getListPageReviewSuccess,
  [Types.GET_LIST_PAGE_REVIEW_FAILURE]: getListPageReviewFailure,

  [Types.GET_LIST_PAGE_FOOD_NEWS_REQUEST]: getListPageFoodNewsRequest,
  [Types.GET_LIST_PAGE_FOOD_NEWS_SUCCESS]: getListPageFoodNewsSuccess,
  [Types.GET_LIST_PAGE_FOOD_NEWS_FAILURE]: getListPageFoodNewsFailure,

  [Types.CREATE_PAGE_REQUEST]: createPageRequest,

  [Types.GET_LIST_VERIFY_PAGE_REQUEST]: getListVerifyPageRequest,
  [Types.GET_LIST_VERIFY_PAGE_SUCCESS]: getListVerifyPageSuccess,
  [Types.GET_LIST_VERIFY_PAGE_FAILURE]: getListVerifyPageFailure,

  [Types.GET_LIST_VERIFY_PAGE_ID_REQUEST]: getListVerifyPageIdRequest,
  [Types.GET_LIST_VERIFY_PAGE_ID_SUCCESS]: getListVerifyPageIdSuccess,
  [Types.GET_LIST_VERIFY_PAGE_ID_FAILURE]: getListVerifyPageIdFailure,
});
