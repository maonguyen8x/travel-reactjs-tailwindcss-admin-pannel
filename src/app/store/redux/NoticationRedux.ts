import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';

const { Types, Creators } = createActions<any, any>({
  getListNotificationRequest: ['filter'],
  getListNotificationSuccess: ['notifications', 'pages', 'count'],
  getListNotificationFailure: null,

  deleteNotificationRequest: ['id'],
});

export const NotificationTypes = Types;
export default Creators;

export const NotificationSelectors = {
  getCurrentFilterGetListNotification: (state: any) =>
    state.notification.filter,
};

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  pages: 0,
  filter: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    search: '',
  },
  count: 0,
  notifications: [],
});

const getListNotificationRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getListNotificationSuccess = (
  state: any,
  { notifications, pages, count }: any
) =>
  state.merge({
    fetching: false,
    error: null,
    notifications,
    pages,
    count,
  });

const getListNotificationFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

export const NotificationReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_NOTIFICATION_REQUEST]: getListNotificationRequest,
  [Types.GET_LIST_NOTIFICATION_SUCCESS]: getListNotificationSuccess,
  [Types.GET_LIST_NOTIFICATION_FAILURE]: getListNotificationFailure,
});
