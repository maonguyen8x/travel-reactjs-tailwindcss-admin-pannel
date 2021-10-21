import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions<any, any>({
  getListStaySubServicesRequest: null,
  getListStaySubServicesSuccess: ['listSubServices'],
  getListStaySubServicesFailure: null,

  getStaySubServicesByIdRequest: ['id'],
  getStaySubServicesByIdSuccess: ['subServicesDetail'],
  getStaySubServicesByIdFailure: null,

  createStaySubServicesRequest: ['data'],
  createStaySubServicesSuccess: null,
  createStaySubServicesFailure: null
});

export const StaySubServices = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetchingStaySubServices: false,
  error: null,
  listSubServices: [],
  subServicesDetail: null
});

const getListStaySubServicesRequest = (state: any) =>
  state.merge({ fetchingStaySubServices: true });
const getListStaySubServicesSuccess = (state: any, { listSubServices }: any) =>
  state.merge({
    fetchingStaySubServices: false,
    error: null,
    listSubServices
  });
const getListStaySubServicesFailure = (state: any) =>
  state.merge({
    fetchingStaySubServices: false,
    error: true,
    listSubServices: []
  });

const createStaySubServicesRequest = (state: any) =>
  state.merge({ fetchingStaySubServices: true });
const createStaySubServicesSuccess = (state: any, { listSubServices }: any) =>
  state.merge({
    fetchingStaySubServices: false,
    error: null,
    listSubServices
  });
const createStaySubServicesFailure = (state: any) =>
  state.merge({
    fetchingStaySubServices: false,
    error: true,
    listSubServices: []
  });

const getStaySubServicesByIdRequest = (state: any) =>
  state.merge({ fetchingStaySubServicesId: true });
const getStaySubServicesByIdSuccess = (
  state: any,
  { subServicesDetail }: any
) =>
  state.merge({
    fetchingStaySubServicesId: false,
    error: null,
    subServicesDetail
  });
const getStaySubServicesByIdFailure = (state: any) =>
  state.merge({
    fetchingStaySubServicesId: false,
    error: true,
    subServicesDetail: []
  });
export const StaySubServicesReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_STAY_SUB_SERVICES_REQUEST]: getListStaySubServicesRequest,
  [Types.GET_LIST_STAY_SUB_SERVICES_SUCCESS]: getListStaySubServicesSuccess,
  [Types.GET_LIST_STAY_SUB_SERVICES_FAILURE]: getListStaySubServicesFailure,

  [Types.CREATE_STAY_SUB_SERVICES_REQUEST]: createStaySubServicesRequest,
  [Types.CREATE_STAY_SUB_SERVICES_SUCCESS]: createStaySubServicesSuccess,
  [Types.CREATE_STAY_SUB_SERVICES_FAILURE]: createStaySubServicesFailure,

  [Types.GET_STAY_SUB_SERVICES_BY_ID_REQUEST]: getStaySubServicesByIdRequest,
  [Types.GET_STAY_SUB_SERVICES_BY_ID_SUCCESS]: getStaySubServicesByIdSuccess,
  [Types.GET_STAY_SUB_SERVICES_BY_ID_FAILURE]: getStaySubServicesByIdFailure
});
