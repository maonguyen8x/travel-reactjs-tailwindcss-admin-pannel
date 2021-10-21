import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  loginRequest: ['account'],
  loginSuccess: ['data'],
  loginFailure: null,

  getUserMeRequest: ['token'],
  getUserMeSuccess: ['profile'],
  getUserMeFailure: null,
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  fetchingLogin: false,
  fetchingGetUserMe: true,
  username: '',
  email: '',
  role: '',
  profile: null,
});
/* ------------- Reducers ------------- */

const loginRequest = (state: any) => ({ ...state, fetchingLogin: true });
const loginSuccess = (state: any, { data }: any) => {
  const user = data.current_user;
  return {
    ...state,

    error: null,
    token: data.token,
    userId: user.id,
    fetchingLogin: false,
  };
};
const loginFailure = (state: any) => ({ ...state, fetchingLogin: false });

const getUserMeRequest = (state: any) => ({
  ...state,
  fetchingGetUserMe: true,
});
const getUserMeSuccess = (state: any, { profile }: any) => ({
  ...state,
  error: null,
  fetchingGetUserMe: false,
  profile,
});

const getUserMeFailure = (state: any) => ({
  ...state,
  fetchingGetUserMe: false,
  error: true,
});
/* ------------- Hookup Reducers To Types ------------- */
export const AuthReducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,

  [Types.GET_USER_ME_REQUEST]: getUserMeRequest,
  [Types.GET_USER_ME_SUCCESS]: getUserMeSuccess,
  [Types.GET_USER_ME_FAILURE]: getUserMeFailure,
});
