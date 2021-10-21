import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';

const { Types, Creators } = createActions<any, any>({
  getListFeedbackRequest: ['filter'],
  getListFeedbackSuccess: ['listFeedback', 'pages'],
  getListFeedbackFailure: null,

  getFeedbackByIdRequest: ['id'],
  getFeedbackByIdSuccess: ['feedbackDetail'],
  getFeedbackByIdFailure: null,

  editFeedbackRequest: ['id', 'feedback'],

  deleteFeedbackRequest: ['id'],
});

export const FeedbackTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  pages: 0,
  filter: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.CHANGE_LOCATION,
    offset: 0,
    limit: 10,
    status: '',
    search: '',
  },
});

const getListFeedbackRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getListFeedbackSuccess = (state: any, { listFeedback, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    listFeedback,
    pages,
  });

const getListFeedbackFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const getFeedbackByIdRequest = (state: any) => state.merge({ fetching: true });

const getFeedbackByIdSuccess = (state: any, { feedbackDetail }: any) =>
  state.merge({
    fetching: false,
    error: null,
    feedbackDetail,
  });

const getFeedbackByIdFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const editFeedbackRequest = (state: any) => state.merge({ fetching: true });

const deleteFeedbackRequest = (state: any) => state.merge({ fetching: true });

export const FeedbackReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_FEEDBACK_REQUEST]: getListFeedbackRequest,
  [Types.GET_LIST_FEEDBACK_SUCCESS]: getListFeedbackSuccess,
  [Types.GET_LIST_FEEDBACK_FAILURE]: getListFeedbackFailure,

  [Types.GET_FEEDBACK_BY_ID_REQUEST]: getFeedbackByIdRequest,
  [Types.GET_FEEDBACK_BY_ID_SUCCESS]: getFeedbackByIdSuccess,
  [Types.GET_FEEDBACK_BY_ID_FAILURE]: getFeedbackByIdFailure,

  [Types.EDIT_FEEDBACK_REQUEST]: editFeedbackRequest,

  [Types.DELETE_FEEDBACK_REQUEST]: deleteFeedbackRequest,
});
