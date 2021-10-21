import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  getListPostRequest: ['filter'],
  getListPostSuccess: ['listPost', 'pages'],
  getListPostFailure: null,

  getPostByIdRequest: ['id'],
  getPostByIdSuccess: ['postDetail'],
  getPostByIdFailure: null,

  createPostRequest: ['post'],

  editPostRequest: ['id', 'post'],

  deletePostRequest: ['id'],

  lockPostRequest: ['id', 'data'],
});

export const PostTypes = Types;
export default Creators;

export const PostsSelectors = {
  getCurrentFilterGetListPosts: (state: any) => state.post.filter,
};

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingPostDetail: false,
  fetchingPost: false,
  fetching: false,
  error: null,
  postDetail: null,
  listPost: [],
  offset: 0,
  limit: 10,
  pages: 0,
  postId: null,
  data: [],
  comment: [],
  share: [],
  ranking: [],
  like: [],
  filter: {
    searchType: '',
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    search: '',
    mine: 'mine',
  },
});
/* ------------- Reducers ------------- */

const getListPostRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingPost: true, filter: filter || state.filter });
const getListPostSuccess = (state: any, { listPost, pages }: any) =>
  state.merge({
    fetchingPost: false,
    error: null,
    listPost,
    pages,
  });
const getListPostFailure = (state: any) =>
  state.merge({ fetchingPost: false, error: true });

const getPostByIdRequest = (state: any) =>
  state.merge({ fetchingPostDetail: true });
const getPostByIdSuccess = (state: any, { postDetail }: any) =>
  state.merge({
    fetchingPostDetail: false,
    postDetail,
  });
const getPostByIdFailure = (state: any) =>
  state.merge({ fetchingPostDetail: false, postDetail: null });

/* ------------- Hookup Reducers To Types ------------- */
export const PostReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_POST_REQUEST]: getListPostRequest,
  [Types.GET_LIST_POST_SUCCESS]: getListPostSuccess,
  [Types.GET_LIST_POST_FAILURE]: getListPostFailure,

  [Types.GET_POST_BY_ID_REQUEST]: getPostByIdRequest,
  [Types.GET_POST_BY_ID_SUCCESS]: getPostByIdSuccess,
  [Types.GET_POST_BY_ID_FAILURE]: getPostByIdFailure,
});
