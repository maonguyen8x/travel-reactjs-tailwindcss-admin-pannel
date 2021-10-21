import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  saveDataCustomField: ['dataCustom'],

  getCurrencyRequest: null,
  getCurrencySuccess: ['currencies'],
  getCurrencyFailure: null,

  saveLanguage: ['lang'],

  saveToggleSidebar: ['match'],

  saveSidebarShrink: ['shrink'],

  saveToken: ['token'],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingCurrency: false,
  currencies: [],
  dataCustom: [],
  lang: 'vi',
  match: '',
  token: null,
  shrink: false,
});
/* ------------- Reducers ------------- */

const getCurrencyRequest = (state: any) =>
  state.merge({ fetchingCurrency: true });
const getCurrencySuccess = (state: any, { currencies }: any) =>
  state.merge({
    currencies,
  });
const getCurrencyFailure = (state: any) =>
  state.merge({ fetchingCurrency: false, currencies: [] });

const saveDataCustomField = (state: any, { dataCustom }: any) =>
  state.merge({ dataCustom });

const saveLanguage = (state: any, { lang }: any) => state.merge({ lang });

const saveToggleSidebar = (state: any, { match }: any) =>
  state.merge({ match });

const saveSidebarShrink = (state: any, { shrink }: any) =>
  state.merge({ shrink });

const saveToken = (state: any, { token }: any) => state.merge({ token });

/* ------------- Hookup Reducers To Types ------------- */
export const AppReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_DATA_CUSTOM_FIELD]: saveDataCustomField,

  [Types.SAVE_LANGUAGE]: saveLanguage,

  [Types.SAVE_TOGGLE_SIDEBAR]: saveToggleSidebar,

  [Types.SAVE_SIDEBAR_SHRINK]: saveSidebarShrink,

  [Types.GET_CURRENCY_REQUEST]: getCurrencyRequest,
  [Types.GET_CURRENCY_SUCCESS]: getCurrencySuccess,
  [Types.GET_CURRENCY_FAILURE]: getCurrencyFailure,

  [Types.SAVE_TOKEN]: saveToken,
});
