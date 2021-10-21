import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';

const { Types, Creators } = createActions<any, any>({
  getListPolicyRequest: ['filter'],
  getListPolicySuccess: ['listPolicy', 'pages'],
  getListPolicyFailure: null,

  getPolicyByIdRequest: ['id'],
  getPolicyByIdSuccess: ['policyDetail'],
  getPolicyByIdFailure: null,

  createPolicyRequest: ['policy'],
  createPolicySuccess: null,
  createPolicyFailure: null,

  editPolicyRequest: ['id', 'policy'],
  editPolicySuccess: null,
  editPolicyFailure: null,
});

export const PolicyTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  offset: 0,
  limit: 10,
  pages: 0,
  listPolicy: [],
  policyDetail: [],
  filter: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    fromDate: '',
    toDate: '',
  },
});

const getListPolicyRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getListPolicySuccess = (state: any, { listPolicy, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    listPolicy,
    pages,
  });

const getListPolicyFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const getPolicyByIdRequest = (state: any) => state.merge({ fetching: true });

const getPolicyByIdSuccess = (state: any, { policyDetail }: any) =>
  state.merge({
    fetching: false,
    error: null,
    policyDetail,
  });

const getPolicyByIdFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const createPolicyRequest = (state: any) => state.merge({ fetching: true });

const createPolicySuccess = (state: any) =>
  state.merge({ fetching: false, error: null });

const createPolicyFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

const editPolicyRequest = (state: any) => state.merge({ fetching: true });

const editPolicySuccess = (state: any) =>
  state.merge({ fetching: false, error: null });

const editPolicyFailure = (state: any) =>
  state.merge({ fetching: false, error: true });

export const PolicyReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_POLICY_REQUEST]: getListPolicyRequest,
  [Types.GET_LIST_POLICY_SUCCESS]: getListPolicySuccess,
  [Types.GET_LIST_POLICY_FAILURE]: getListPolicyFailure,

  [Types.GET_POLICY_BY_ID_REQUEST]: getPolicyByIdRequest,
  [Types.GET_POLICY_BY_ID_SUCCESS]: getPolicyByIdSuccess,
  [Types.GET_POLICY_BY_ID_FAILURE]: getPolicyByIdFailure,

  [Types.CREATE_POLICY_REQUEST]: createPolicyRequest,
  [Types.CREATE_POLICY_SUCCESS]: createPolicySuccess,
  [Types.CREATE_POLICY_FAILURE]: createPolicyFailure,

  [Types.EDIT_POLICY_REQUEST]: editPolicyRequest,
  [Types.EDIT_POLICY_SUCCESS]: editPolicySuccess,
  [Types.EDIT_POLICY_FAILURE]: editPolicyFailure,
});
