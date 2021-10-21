import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions<any, any>({
  getListImageRequest: ['offset', 'limit'],
  getListImageSuccess: ['data', 'pages'],
  getListImageFailure: null,

  getListVideoRequest: ['offset', 'limit'],
  getListVideoSuccess: ['data', 'pages'],
  getListVideoFailure: null,

  deleteMediaContentRequest: ['id'],

  searchTimeMediaContentRequest: [
    'createdAt1',
    'createdAt2',
    'offset',
    'limit',
  ],
  searchTimeMediaContentSuccess: ['data'],
  searchTimeMediaContentFailure: null,

  getListBackgroundPostRequest: ['offset', 'limit'],
  getListBackgroundPostSuccess: ['data', 'pages'],
  getListBackgroundPostFailure: null,

  deleteBackgroundPostRequest: ['id'],

  createBackgroundPostRequest: ['background'],

  editBackgroundPostRequest: ['id', 'background'],

  getBackgroundPostByIdRequest: ['id'],
  getBackgroundPostByIdSuccess: ['backgroundPostDetail'],
  getBackgroundPostByIdFailure: null,
});

export const MediaContentTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetchingListImage: false,
  fetchingListVideo: false,
  fetchingListBackgroundPost: false,
  fetching: false,
  error: null,
  listImage: [],
  listVideo: [],
  offset: 0,
  limit: 16,
  pages: 0,
  listBackgroundPost: [],
  backgroundPostDetail: {},
});

const getListImageRequest = (state: any, { offset = 0, limit = 16 }: any) =>
  state.merge({ fetchingListImage: true, offset, limit });
const getListImageSuccess = (state: any, { data, pages }: any) =>
  state.merge({
    fetchingListImage: false,
    error: null,
    listImage: data,
    pages,
  });
const getListImageFailure = (state: any) =>
  state.merge({ fetchingListImage: false, error: true });

const getListVideoRequest = (state: any, { offset = 0, limit = 16 }: any) =>
  state.merge({ fetchingListVideo: true, offset, limit });
const getListVideoSuccess = (state: any, { data, pages }: any) =>
  state.merge({
    fetchingListVideo: false,
    error: null,
    listVideo: data,
    pages,
  });
const getListVideoFailure = (state: any) =>
  state.merge({ fetchingListVideo: false, error: true });

const deleteMediaContentRequest = (state: any) =>
  state.merge({ fetching: true });

const searchTimeMediaContentRequest = (
  state: any,
  { offset = 0, limit = 10000 }: any
) => state.merge({ fetchingListMediaContent: false, offset, limit });

const searchTimeMediaContentSuccess = (state: any, data: any) =>
  state.merge({
    fetchingListMediaContent: false,
    error: null,
    listMediaContent: data,
  });
const searchTimeMediaContentFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const getListBackgroundPostRequest = (
  state: any,
  { offset = 0, limit = 10 }: any
) => state.merge({ fetchingListBackgroundPost: true, offset, limit });
const getListBackgroundPostSuccess = (state: any, { data, pages }: any) =>
  state.merge({
    fetchingListBackgroundPost: false,
    error: null,
    listBackgroundPost: data,
    pages,
  });
const getListBackgroundPostFailure = (state: any) =>
  state.merge({ fetchingListBackgroundPost: false, error: true });

const deleteBackgroundPostRequest = (state: any) =>
  state.merge({ fetching: true });

const createBackgroundPostRequest = (state: any) =>
  state.merge({ fetchingListBackgroundPost: true });

const editBackgroundPostRequest = (state: any) =>
  state.merge({ fetchingListBackgroundPost: true });

const getBackgroundPostByIdRequest = (state: any) =>
  state.merge({ fetchingListBackgroundPost: true });
const getBackgroundPostByIdSuccess = (
  state: any,
  { backgroundPostDetail }: any
) =>
  state.merge({
    fetchingListBackgroundPost: false,
    backgroundPostDetail,
  });
const getBackgroundPostByIdFailure = (state: any) =>
  state.merge({
    fetchingListBackgroundPost: false,
    backgroundPostDetail: null,
  });

export const MediaContentReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_IMAGE_REQUEST]: getListImageRequest,
  [Types.GET_LIST_IMAGE_SUCCESS]: getListImageSuccess,
  [Types.GET_LIST_IMAGE_FAILURE]: getListImageFailure,

  [Types.GET_LIST_VIDEO_REQUEST]: getListVideoRequest,
  [Types.GET_LIST_VIDEO_SUCCESS]: getListVideoSuccess,
  [Types.GET_LIST_VIDEO_FAILURE]: getListVideoFailure,

  [Types.DELETE_MEDIA_CONTENT_REQUEST]: deleteMediaContentRequest,

  [Types.SEARCH_TIME_MEDIA_CONTENT_REQUEST]: searchTimeMediaContentRequest,
  [Types.SEARCH_TIME_MEDIA_CONTENT_SUCCESS]: searchTimeMediaContentSuccess,
  [Types.SEARCH_TIME_MEDIA_CONTENT_FAILURE]: searchTimeMediaContentFailure,

  [Types.GET_LIST_BACKGROUND_POST_REQUEST]: getListBackgroundPostRequest,
  [Types.GET_LIST_BACKGROUND_POST_SUCCESS]: getListBackgroundPostSuccess,
  [Types.GET_LIST_BACKGROUND_POST_FAILURE]: getListBackgroundPostFailure,

  [Types.DELETE_BACKGROUND_POST_REQUEST]: deleteBackgroundPostRequest,

  [Types.CREATE_BACKGROUND_POST_REQUEST]: createBackgroundPostRequest,

  [Types.EDIT_BACKGROUND_POST_REQUEST]: editBackgroundPostRequest,

  [Types.GET_BACKGROUND_POST_BY_ID_REQUEST]: getBackgroundPostByIdRequest,
  [Types.GET_BACKGROUND_POST_BY_ID_SUCCESS]: getBackgroundPostByIdSuccess,
  [Types.GET_BACKGROUND_POST_BY_ID_FAILURE]: getBackgroundPostByIdFailure,
});
