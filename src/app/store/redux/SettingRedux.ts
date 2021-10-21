import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  setLogoBg: ['value'],
  setNavbarBg: ['value'],
  setSidebarBg: ['value'],
  setTheme: ['value'],
  setDir: ['value'],
  setSidebarPos: ['value'],
  setHeaderPos: ['value'],
  setLayout: ['value'],
  setSidebarType: ['value']
});

export const SettingTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  activeDir: 'ltr',
  activeThemeLayout: 'vertical',
  activeTheme: 'light',
  activeSidebarType: 'full',
  activeLogoBg: 'skin6',
  activeNavbarBg: 'skin3',
  activeSidebarBg: 'skin6',
  activeSidebarPos: 'fixed',
  activeHeaderPos: 'fixed',
  activeLayout: 'full'
});
/* ------------- Reducers ------------- */

const setLogoBg = (state: any, { value }: any) => state.merge({ value });
const setNavbarBg = (state: any, { value }: any) => state.merge({ value });
const setSidebarBg = (state: any, { value }: any) => state.merge({ value });
const setTheme = (state: any, { value }: any) => state.merge({ value });
const setDir = (state: any, { value }: any) => state.merge({ value });
const setSidebarPos = (state: any, { value }: any) => state.merge({ value });
const setHeaderPos = (state: any, { value }: any) => state.merge({ value });
const setLayout = (state: any, { value }: any) => state.merge({ value });
const setSidebarType = (state: any, { value }: any) => state.merge({ value });

/* ------------- Hookup Reducers To Types ------------- */
export const SettingReducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOGO_BG]: setLogoBg,
  [Types.SET_NAVBAR_BG]: setNavbarBg,
  [Types.SET_SIDEBAR_BG]: setSidebarBg,
  [Types.SET_THEME]: setTheme,
  [Types.SET_DIR]: setDir,
  [Types.SET_SIDEBAR_POS]: setSidebarPos,
  [Types.SET_HEADER_POS]: setHeaderPos,
  [Types.SET_LAYOUT]: setLayout,
  [Types.SET_SIDEBAR_TYPE]: setSidebarType
});
