import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES } from '../../constants';

const { Types, Creators } = createActions<any, any>({
  getBlackListIPSRequest: ['filter'],
  getBlackListIPSSuccess: ['listBlackListIPS', 'pages'],
  getBlackListIPSFailure: null,
});

export const SecurityTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  pages: 0,
  filter: {
    searchType: SEARCH_TYPES.DEFAULT,
    offset: 0,
    limit: 10,
    status: '',
    search: '',
    fromDate: '',
    toDate: '',
  },
});

const getBlackListIPSRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getBlackListIPSSuccess = (state: any, { listBlackListIPS, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    listBlackListIPS,
    pages,
  });

const getBlackListIPSFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

export const SecurityReducer = createReducer(INITIAL_STATE, {
  [Types.GET_BLACK_LIST_IPS_REQUEST]: getBlackListIPSRequest,
  [Types.GET_BLACK_LIST_IPS_SUCCESS]: getBlackListIPSSuccess,
  [Types.GET_BLACK_LIST_IPS_FAILURE]: getBlackListIPSFailure,
});
