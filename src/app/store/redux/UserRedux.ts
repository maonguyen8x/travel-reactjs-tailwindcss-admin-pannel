import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  getListUserRequest: ['filter'],
  getListUserSuccess: ['listUser', 'pages'],
  getListUserFailure: null,

  getListUserBlockedRequest: ['filterUserBlocked'],
  getListUserBlockedSuccess: [
    'listUserBlocked',
    'pagesUserBlocked',
    'totalUserBlocked',
  ],
  getListUserBlockedFailure: null,

  getUserByIdRequest: ['id'],
  getUserByIdSuccess: ['userDetail', 'listPost', 'listBookings', 'listPage'],
  getUserByIdFailure: null,

  updateUserProfileRequest: ['profile'],

  lockUserRequest: ['id', 'data'],
});

export const UserTypes = Types;
export default Creators;

export const UserSelectors = {
  getCurrentFilterGetListUsers: (state: any) => state.user.filter,
  getCurrentFilterGetListUsersBlock: (state: any) =>
    state.user.filterUserBlocked,
};

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingCreate: false,
  fetchingListUser: false,
  fetchingUserById: false,
  error: null,
  listUser: [],
  listUserBlocked: [],
  pages: 0,
  pagesUserBlocked: 0,
  userDetail: null,
  listBookings: [],
  listPage: [],
  listPost: [],
  fetching: true,
  filter: {
    id: '',
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    search: '',
    status: '',
  },
  filterUserBlocked: {
    id: '',
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    search: '',
    status: '',
  },
  totalUserBlocked: 0,
});
/* ------------- Reducers ------------- */

const getListUserRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingListUser: true, filter: filter || state.filter });
const getListUserSuccess = (state: any, { listUser, pages }: any) =>
  state.merge({
    fetchingListUser: false,
    error: null,
    listUser,
    pages,
  });
const getListUserFailure = (state: any) =>
  state.merge({ fetchingListUser: false, error: true, listUser: [] });

const getListUserBlockedRequest = (state: any, { filterUserBlocked }: any) =>
  state.merge({ fetchingUserBlocked: true, filterUserBlocked });

const getListUserBlockedSuccess = (
  state: any,
  { listUserBlocked, pagesUserBlocked, totalUserBlocked }: any
) =>
  state.merge({
    fetchingUserBlocked: false,
    error: null,
    listUserBlocked,
    pagesUserBlocked,
    totalUserBlocked,
  });
const getListUserBlockedFailure = (state: any) =>
  state.merge({ fetchingListUser: false, error: true, listUserBlocked: [] });

const getUserByIdRequest = (state: any) =>
  state.merge({ fetchingUserById: true });
const getUserByIdSuccess = (
  state: any,
  { userDetail, listPost, listBookings, listPage }: any
) =>
  state.merge({
    fetchingUserById: false,
    userDetail,
    listPost,
    listBookings,
    listPage,
  });
const getUserByIdFailure = (state: any) =>
  state.merge({
    fetchingUserById: false,
    userDetail: [],
    listBookings: [],
    listPage: [],
  });

/* ------------- Hookup Reducers To Types ------------- */
export const UserReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_USER_REQUEST]: getListUserRequest,
  [Types.GET_LIST_USER_SUCCESS]: getListUserSuccess,
  [Types.GET_LIST_USER_FAILURE]: getListUserFailure,

  [Types.GET_LIST_USER_BLOCKED_REQUEST]: getListUserBlockedRequest,
  [Types.GET_LIST_USER_BLOCKED_SUCCESS]: getListUserBlockedSuccess,
  [Types.GET_LIST_USER_BLOCKED_FAILURE]: getListUserBlockedFailure,

  [Types.GET_USER_BY_ID_REQUEST]: getUserByIdRequest,
  [Types.GET_USER_BY_ID_SUCCESS]: getUserByIdSuccess,
  [Types.GET_USER_BY_ID_FAILURE]: getUserByIdFailure,
});
