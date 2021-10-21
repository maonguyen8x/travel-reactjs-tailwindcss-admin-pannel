import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';

const { Types, Creators } = createActions<any, any>({
  getListReportRequest: ['filter'],
  getListReportSuccess: ['listReport', 'pages'],
  getListReportFailure: null,

  editStatusReportRequest: ['id', 'body'],

  getReportByIdRequest: ['id'],
  getReportByIdSuccess: ['reportDetail'],
  getReportByIdFailure: null,
});

export const ReportTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetchingCreateReport: false,
  fetchingListReport: false,
  fetchingListUserId: false,
  fetchingReportDetail: false,
  error: null,
  listReport: [],
  pages: 0,
  keywordSort: null,
  reportDetail: [],
  filter: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.REPORT,
    offset: 0,
    limit: 10,
    postId: '',
    status: '',
    type: '',
  },
});

const getListReportRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingListReport: true, filter });
const getListReportSuccess = (
  state: any,
  { listReport, pages, keywordSort }: any
) =>
  state.merge({
    fetchingListReport: false,
    error: null,
    listReport,
    pages,
    keywordSort,
  });
const getListReportFailure = (state: any) =>
  state.merge({ fetchingListReport: false, error: true, listReport: [] });

const editStatusReportRequest = (state: any) =>
  state.merge({ fetchingListReport: true });

const getReportByIdRequest = (state: any) =>
  state.merge({ fetchingReportDetail: true });
const getReportByIdSuccess = (state: any, { reportDetail }: any) =>
  state.merge({
    fetchingReportDetail: false,
    reportDetail,
  });
const getReportByIdFailure = (state: any) =>
  state.merge({ fetchingReportDetail: false, reportDetail: null });

export const ReportReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_REPORT_REQUEST]: getListReportRequest,
  [Types.GET_LIST_REPORT_SUCCESS]: getListReportSuccess,
  [Types.GET_LIST_REPORT_FAILURE]: getListReportFailure,

  [Types.EDIT_STATUS_REPORT_REQUEST]: editStatusReportRequest,

  [Types.GET_REPORT_BY_ID_REQUEST]: getReportByIdRequest,
  [Types.GET_REPORT_BY_ID_SUCCESS]: getReportByIdSuccess,
  [Types.GET_REPORT_BY_ID_FAILURE]: getReportByIdFailure,
});
