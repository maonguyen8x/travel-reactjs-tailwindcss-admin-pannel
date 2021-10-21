import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions<any, any>({
  createMessengerRequest: ['messenger'],

  editMessengerRequest: ['messenger'],
});

export const MessengerTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  pages: 0,
});

export const MessengerReducer = createReducer(INITIAL_STATE, {
  //
});
